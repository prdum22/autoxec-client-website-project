import { Link, useNavigate } from 'react-router-dom'
import { TRENDING, TOPICS } from '../data'
import { articleUrl } from '../lib/site'
import { useToast } from '../context/ToastContext'

export function SidebarWidgets() {
  const navigate = useNavigate()
  const showToast = useToast()

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Trending Now</div>
        {TRENDING.map((t) => (
          <Link key={t.num} to={articleUrl(t.slug)} className="trending-item" style={{ textDecoration: 'none' }}>
            <div className="trending-num">{t.num}</div>
            <div>
              <div className="trending-title">{t.title}</div>
              <div className="trending-meta mono">{t.meta}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Explore Topics</div>
        <div className="topic-chips">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="topic-chip"
              onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}`)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="newsletter-box">
          <div className="newsletter-title condensed">Intelligence Brief</div>
          <div className="newsletter-desc">
            Weekly engineering analysis delivered to your inbox. No spec sheets. No opinion. Just verified technical
            intelligence.
          </div>
          <input className="newsletter-input" placeholder="your@email.com" />
          <button
            type="button"
            className="newsletter-btn condensed"
            onClick={() => showToast('Subscribed to Intelligence Brief!')}
          >
            SUBSCRIBE FREE →
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">This Week&apos;s Stats</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--red)' }}>
              24
            </div>
            <div className="stat-lbl">ARTICLES</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--purpleL)' }}>
              11K
            </div>
            <div className="stat-lbl">UPVOTES</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: '#4AE080' }}>
              48K
            </div>
            <div className="stat-lbl">READERS</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: '#4ADADA' }}>
              3.2K
            </div>
            <div className="stat-lbl">SHARES</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
