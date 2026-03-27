import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_CATEGORIES } from '../data'
import { categoryToPathSlug } from '../lib/site'
import { useToast } from '../context/ToastContext'

export function SiteNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showToast = useToast()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isNavActive = (id: (typeof NAV_CATEGORIES)[number]['id']) => {
    if (id === 'all') return pathname === '/'
    return pathname === `/category/${categoryToPathSlug(id)}`
  }

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) {
      showToast('Type a search query')
      return
    }
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-text condensed">
            AUTO<span>XEC</span>
          </div>
          <div className="nav-tag mono">MOBILITY INTELLIGENCE</div>
        </Link>

        <div className="nav-links">
          {NAV_CATEGORIES.map(({ id, label }) =>
            id === 'all' ? (
              <Link
                key={id}
                to="/"
                className={`nav-link${isNavActive(id) ? ' active' : ''}`}
              >
                {label}
              </Link>
            ) : (
              <Link
                key={id}
                to={`/category/${categoryToPathSlug(id)}`}
                className={`nav-link${isNavActive(id) ? ' active' : ''}`}
              >
                {label}
              </Link>
            ),
          )}
        </div>

        <div className="nav-right">
          <form className="nav-search-form" onSubmit={onSearch}>
            <label htmlFor="site-search" className="visually-hidden">
              Search AutoXec
            </label>
            <input
              id="site-search"
              className="search-box"
              placeholder="Search AutoXec..."
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
          <Link to="/subscribe" className="nav-btn" style={{ textAlign: 'center' }}>
            SUBSCRIBE
          </Link>
          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-overlay${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menu">
        {NAV_CATEGORIES.map(({ id, label }) =>
          id === 'all' ? (
            <Link key={id} to="/" className={`nav-link${isNavActive(id) ? ' active' : ''}`}>
              {label}
            </Link>
          ) : (
            <Link
              key={id}
              to={`/category/${categoryToPathSlug(id)}`}
              className={`nav-link${isNavActive(id) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ),
        )}
        <Link to="/subscribe" className="nav-btn" style={{ marginTop: 16 }}>
          SUBSCRIBE
        </Link>
      </div>
    </>
  )
}
