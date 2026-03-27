import { useMemo } from 'react'
import { TICKER_ITEMS } from '../data'

export function BreakingTicker() {
  const tickerDup = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS], [])

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-label mono">LIVE</div>
      <div className="ticker-track">
        <div className="ticker-inner">
          {tickerDup.map((text, i) => (
            <span key={`${text}-${i}`} className="ticker-item">
              {text}
              <span className="ticker-dot" aria-hidden>
                {' '}
                ●{' '}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
