import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ArticlePage } from './pages/ArticlePage'
import { AuthorPage } from './pages/AuthorPage'
import { CategoryPage } from './pages/CategoryPage'
import { CommunityPage } from './pages/CommunityPage'
import { ContactPage } from './pages/ContactPage'
import { CorrectionsPolicyPage, EditorialPolicyPage, PrivacyPage, TermsPage } from './pages/LegalPages'
import { HomePage } from './pages/HomePage'
import { MediaKitPage } from './pages/MediaKitPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { QuickReadsPage } from './pages/QuickReadsPage'
import { SearchPage } from './pages/SearchPage'
import { SubscribePage } from './pages/SubscribePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="article/:slug" element={<ArticlePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="quick-reads" element={<QuickReadsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="media" element={<MediaKitPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="subscribe" element={<SubscribePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="editorial-policy" element={<EditorialPolicyPage />} />
        <Route path="corrections" element={<CorrectionsPolicyPage />} />
        <Route path="author/preetam" element={<AuthorPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
