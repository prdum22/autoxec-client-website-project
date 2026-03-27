import { useState } from 'react'
import { useToast } from '../context/ToastContext'

const TILES = [
  { title: 'Engineering Knowledge Base', desc: 'Structured deep-dives and searchable technical references.' },
  { title: 'OEM Talent Pipeline', desc: 'Direct visibility for motivated engineering contributors.' },
  { title: 'Expedition Access', desc: 'Field events with measurement-first methodology.' },
  { title: 'Intelligence Points', desc: 'Recognition for verified contributions and peer review.' },
]

const TIERS = [
  { name: 'Field Researcher', price: '₹299/mo' },
  { name: 'Senior Researcher', price: '₹799/mo' },
  { name: 'Principal Investigator', price: '₹1,999/mo' },
]

export function CommunityPage() {
  const showToast = useToast()
  const [email, setEmail] = useState('')

  return (
    <div className="page-shell-wide">
      <h1 className="page-title condensed">College makes graduates. We make real engineers.</h1>
      <p className="page-lead">
        The AutoXec Field Researchers community — India&apos;s automotive community built on engineering intelligence.
      </p>
      <p className="section-label" style={{ marginBottom: 16 }}>
        COMING SOON — Join the waitlist
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
        <input className="newsletter-input" style={{ maxWidth: 280 }} placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button
          type="button"
          className="nav-btn"
          onClick={() => {
            if (!email.includes('@')) {
              showToast('Enter a valid email')
              return
            }
            showToast('Waitlist — thank you!')
          }}
        >
          JOIN WAITLIST
        </button>
      </div>

      <h2 className="sidebar-title">What the community will be</h2>
      <div className="cat-grid" style={{ marginTop: 16 }}>
        {TILES.map((t) => (
          <div key={t.title} className="cat-mini-card" style={{ cursor: 'default', borderTop: '2px solid var(--purple)' }}>
            <div className="cat-mini-title">{t.title}</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Membership tiers (preview)
      </h2>
      <div className="cat-grid">
        {TIERS.map((t) => (
          <div key={t.name} className="cat-mini-card" style={{ borderTop: '2px solid var(--red)' }}>
            <div className="cat-mini-title">{t.name}</div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              {t.price}
            </div>
            <button type="button" className="action-btn" style={{ marginTop: 12 }} onClick={() => showToast(`Notify: ${t.name} — preference saved (demo)`)}>
              NOTIFY ME WHEN OPEN
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
