import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <article className="page-shell prose">
      <h1 className="page-title condensed">Privacy Policy</h1>
      <p className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>
        Last updated: 28 March 2026
      </p>
      <h2 className="sidebar-title" style={{ marginTop: 24 }}>
        1. What AutoXec collects
      </h2>
      Newsletter email, optional name, device/browser data for analytics, and message content you send via forms.
      <h2 className="sidebar-title" style={{ marginTop: 20 }}>
        2. How we use data
      </h2>
      To send the Intelligence Brief, improve the site, and understand audience composition — not to resell attention.
      <h2 className="sidebar-title" style={{ marginTop: 20 }}>
        3. What we do not do
      </h2>
      We do not sell personal data or share it with third parties without a lawful basis and clear disclosure.
      <h2 className="sidebar-title" style={{ marginTop: 20 }}>
        4. Cookies
      </h2>
      Analytics cookies only where enabled; you can opt out in the browser.
      <h2 className="sidebar-title" style={{ marginTop: 20 }}>
        5. Your rights
      </h2>
      Access, correction, deletion where applicable, and one-click unsubscribe from email.
      <h2 className="sidebar-title" style={{ marginTop: 20 }}>
        6. Contact
      </h2>
      <a href="mailto:media@autoxec.in">media@autoxec.in</a>
    </article>
  )
}

export function TermsPage() {
  return (
    <article className="page-shell prose">
      <h1 className="page-title condensed">Terms of Service</h1>
      <p className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>
        Last updated: 28 March 2026
      </p>
      <ol style={{ paddingLeft: '1.25rem', color: 'var(--muted)', lineHeight: 1.8 }}>
        <li>Content is informational — not professional mechanical or legal advice.</li>
        <li>AutoXec owns published editorial content; republishing requires permission.</li>
        <li>Upvotes are engagement signals — not endorsements of safety or fitness for use.</li>
        <li>Newsletter is free; unsubscribe anytime.</li>
        <li>Third-party links are not controlled by AutoXec.</li>
        <li>We may correct, update, or remove content.</li>
        <li>Indian law governs these terms.</li>
        <li>Questions: <a href="mailto:media@autoxec.in">media@autoxec.in</a></li>
      </ol>
    </article>
  )
}

export function EditorialPolicyPage() {
  return (
    <article className="page-shell prose">
      <h1 className="page-title condensed">Editorial Policy</h1>
      <p className="pull-quote" style={{ fontSize: 18 }}>
        Every technical claim is verified against primary sources before publication. Manufacturer marketing is not accepted
        as fact without independent engineering corroboration.
      </p>
      <h2 className="sidebar-title">Sources we accept</h2>
      <p>OEM workshop manuals, peer-reviewed papers, regulatory filings, on-record OEM communications, verified practitioners.</p>
      <h2 className="sidebar-title">Sources we do not accept alone</h2>
      <p>Unattributed forums, viral posts, glossy brochures, uncorroborated press releases.</p>
      <h2 className="sidebar-title">Corrections</h2>
      <p>
        Incorrect technical information is corrected publicly with date and nature of the fix — not silently memory-holed.
      </p>
      <h2 className="sidebar-title">Sponsored content</h2>
      <p>Clearly labelled SPONSORED at the top; sponsorship does not change factual conclusions.</p>
      <h2 className="sidebar-title">Independence</h2>
      <p>Vehicle access is temporary, disclosed, and does not buy editorial conclusions.</p>
      <p>
        <Link to="/contact?reason=correction">Report an error here →</Link>
      </p>
    </article>
  )
}

export function CorrectionsPolicyPage() {
  return (
    <article className="page-shell prose">
      <h1 className="page-title condensed">Corrections Policy</h1>
      <p>
        AutoXec publishes corrections with date, original text, and corrected text when technical claims were wrong —
        engineers trust processes more than perfection theatre.
      </p>
      <p>
        <Link to="/contact?reason=correction">Submit a correction request →</Link>
      </p>
    </article>
  )
}
