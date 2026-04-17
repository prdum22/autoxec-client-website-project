# AutoXec Community — Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Name it `autoxec-community`
4. Disable Google Analytics (optional)
5. Click **Create project**

---

## Step 2: Add a Web App

1. In your Firebase project, click the **</>** (Web) icon
2. Register app — name it `autoxec-web`
3. Copy the `firebaseConfig` object — it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "autoxec-community.firebaseapp.com",
  projectId: "autoxec-community",
  storageBucket: "autoxec-community.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

4. **Replace the placeholder config** in ALL three files:
   - `community.html`
   - `threads.html`
   - `thread-detail.html`

   Find this block in each file and replace:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  ...
};
```

---

## Step 3: Enable Authentication

1. In Firebase Console → **Authentication** → **Get started**
2. Enable these sign-in methods:
   - ✅ **Email/Password**
   - ✅ **Google** (click, select your support email, save)
3. Under **Settings → Authorized domains**, add your domain (e.g., `autoxec.in`)

---

## Step 4: Create Firestore Database

1. Firebase Console → **Firestore Database** → **Create database**
2. Start in **production mode** (we'll set rules next)
3. Choose a region close to India: `asia-south1` (Mumbai)

### Collections Structure

Your Firestore will have these collections:

```
firestore/
├── users/
│   └── {uid}/
│       ├── displayName: "Preetam Sharma"
│       ├── username: "@preetam"
│       ├── email: "preetam@example.com"
│       ├── photoURL: "https://..."
│       ├── createdAt: Timestamp
│       ├── threads: 0
│       └── replies: 0
│
├── threads/
│   └── {threadId}/
│       ├── title: "Real-world range of BE.6e..."
│       ├── body: "Full thread text here..."
│       ├── category: "EV Builders & Tinkering"
│       ├── subtopic: "Battery Chemistry"
│       ├── author: "@ev_freak"
│       ├── authorId: "uid123"
│       ├── authorPhoto: "https://..."
│       ├── createdAt: Timestamp
│       ├── lastActivity: "2h ago"
│       ├── lastUser: "@mech_guru"
│       ├── replies: 12
│       ├── views: 3420
│       ├── votes: 312
│       ├── pinned: false
│       ├── hot: true
│       ├── solved: false
│       └── replies/ (subcollection)
│           └── {replyId}/
│               ├── body: "Great data! @ev_freak..."
│               ├── authorName: "Mech Guru"
│               ├── username: "@mech_guru"
│               ├── authorId: "uid456"
│               ├── createdAt: Timestamp
│               ├── likes: 24
│               ├── quotedText: "" (optional)
│               └── quotedAuthor: "" (optional)
│
└── stats/
    └── community/
        ├── members: 0
        ├── threads: 0
        ├── replies: 0
        └── online: 0
```

### Create the stats document manually:

1. Firestore → **Start collection** → ID: `stats`
2. Add document → ID: `community`
3. Add fields:
   - `members` (number): `0`
   - `threads` (number): `0`
   - `replies` (number): `0`
   - `online` (number): `0`

---

## Step 5: Set Firestore Security Rules

In Firebase Console → **Firestore** → **Rules**, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public read for threads and replies
    match /threads/{threadId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.authorId == request.auth.uid
                    && request.resource.data.title.size() > 5
                    && request.resource.data.title.size() < 141;
      allow update: if request.auth != null && (
        // Only increment views, votes, replies, lastActivity
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['views', 'votes', 'replies', 'lastActivity', 'lastUser'])
      );

      // Replies subcollection
      match /replies/{replyId} {
        allow read: if true;
        allow create: if request.auth != null
                      && request.resource.data.authorId == request.auth.uid
                      && request.resource.data.body.size() > 1;
        allow update: if request.auth != null && (
          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
        );
        allow delete: if request.auth != null
                      && resource.data.authorId == request.auth.uid;
      }
    }

    // Users can read any profile, write only their own
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Stats — read by all, write by authenticated users (increments only)
    match /stats/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

---

## Step 6: Create Firestore Indexes

Some queries need composite indexes. Firebase will prompt you with a link when a query fails — click it to auto-create. Or create manually:

1. Firestore → **Indexes** → **Composite** → **Add index**
2. Collection: `threads`
3. Index 1:
   - `category` (Ascending)
   - `createdAt` (Descending)
4. Index 2:
   - `subtopic` (Ascending)
   - `createdAt` (Descending)
5. Index 3:
   - `category` (Ascending)
   - `votes` (Descending)

---

## Step 7: Seed a Pinned Announcement (Optional)

To add a pinned announcement to a subtopic, add a thread document manually in Firestore:

- `title`: "[ANNOUNCEMENT] Welcome to Battery Chemistry — Rules & Resources"
- `body`: "Welcome! Please read the community guidelines..."
- `category`: "EV Builders & Tinkering"
- `subtopic`: "Battery Chemistry"
- `author`: "@autoxec_mod"
- `authorId`: "your-uid"
- `pinned`: `true` (boolean)
- `replies`: `0`
- `views`: `0`
- `votes`: `0`
- `createdAt`: (current timestamp)

---

## Step 8: Enable Google Sign-In Domain

If hosting on a custom domain:
1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Click **Add domain** → Enter `autoxec.in` (or your domain)

---

## Quick Checklist

- [ ] Firebase project created
- [ ] `firebaseConfig` replaced in all 3 HTML files
- [ ] Email/Password auth enabled
- [ ] Google auth enabled
- [ ] Firestore database created (asia-south1)
- [ ] `stats/community` document created
- [ ] Security rules published
- [ ] Composite indexes created
- [ ] Domain authorized

---

## How Data Flows

```
User registers
  → Firebase Auth creates user
  → JS saves profile to users/{uid}
  → stats/community.members += 1

User posts thread
  → threads/{id} document created
  → stats/community.threads += 1

User posts reply
  → threads/{id}/replies/{id} subcollection document created
  → threads/{id}.replies += 1
  → stats/community.replies += 1

Thread page loads
  → Real-time listener on threads/{id}/replies
  → Auto-updates UI when new replies arrive

Community page loads
  → stats/community read for hero numbers
  → threads ordered by votes (trending) or createdAt (latest)
```

---

## Hosting (Optional)

To host on Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select your project
# Public directory: . (current directory)
# Single-page app: No
firebase deploy
```

Your site will be live at `https://autoxec-community.web.app`
