import { Outlet } from 'react-router-dom'
import { BreakingTicker } from './BreakingTicker'
import { ScrollToTop } from './ScrollToTop'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <SiteNav />
      <BreakingTicker />
      <Outlet />
      <SiteFooter />
    </>
  )
}
