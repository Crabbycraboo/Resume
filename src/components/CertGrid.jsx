import { useState, useEffect } from 'react'

const isPdf = url => url && url.toLowerCase().includes('.pdf')

function CertModal({ cert, theme, onClose }) {
  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  const accent    = cert.color || theme?.accent || '#E8527A'
  const accentAlt = theme?.accentAlt || accent

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, backdropFilter: 'blur(8px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24,
        maxWidth: 720, width: '100%', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
        animation: 'modalPop 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        overflow: 'hidden',
      }}>
        <div style={{ height: 6, background: `linear-gradient(90deg,${accent},${accentAlt})` }} />
        <div style={{ padding: '22px 26px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 900, color: '#111' }}>{cert.title}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#999' }}>{cert.issuer} · {cert.date || cert.date_issued}</p>
          </div>
          <button onClick={onClose} style={{
            background: '#F5F5F5', border: 'none', borderRadius: '50%',
            width: 34, height: 34, cursor: 'pointer', fontSize: 16, color: '#666',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>✕</button>
        </div>
        <div style={{ padding: '0 26px 26px' }}>
          <img src={cert.image_url} alt={cert.title} style={{ width: '100%', borderRadius: 14, border: '1px solid #EDEDED', display: 'block' }} />
          {cert.credential_url && (
            <a href={cert.credential_url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
              padding: '10px 20px', borderRadius: 10, background: `linear-gradient(135deg,${accent},${accentAlt})`,
              color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 13,
            }}>
              Verify Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CertGrid({ certs, theme }) {
  const [selected, setSelected] = useState(null)
  if (!certs || !certs.length) return null

  const accent    = theme?.accent    || '#E8527A'
  const accentAlt = theme?.accentAlt || accent
  const cardGlass = theme?.cardGlass || 'rgba(255,255,255,0.8)'
  const certBg    = theme?.certBg    || 'rgba(255,255,255,0.88)'
  const certBorder= theme?.certBorder|| '#EEE'
  const accentDark= theme?.accentDark|| '#333'

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px,1fr))', gap: 12 }}>
        {certs.map(c => {
          const hasPdf   = isPdf(c.image_url)
          const hasImage = c.image_url && !hasPdf
          const clickable= hasImage || hasPdf || c.credential_url
          const cAccent  = c.color || accent

          return (
            <div
              key={c.id}
              onClick={() => {
                if (!clickable) return
                if (hasPdf) window.open(c.image_url, '_blank')
                else if (c.credential_url && !hasImage) window.open(c.credential_url, '_blank')
                else setSelected(c)
              }}
              style={{
                background: certBg,
                borderRadius: 16, border: `1.5px solid ${certBorder}`,
                padding: '15px 18px 15px 22px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.22s ease',
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(6px)',
              }}
              onMouseOver={e => {
                if (!clickable) return
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 10px 28px ${cAccent}20`
                e.currentTarget.style.borderColor = `${cAccent}55`
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = certBorder
              }}
            >
              {/* Gradient left bar */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                background: `linear-gradient(180deg, ${cAccent}, ${accentAlt})`,
                borderRadius: '16px 0 0 16px',
              }} />

              {/* Icon badge */}
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${cAccent}18, ${cAccent}30)`,
                border: `1.5px solid ${cAccent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {hasPdf ? '📄' : hasImage ? '🏆' : '✓'}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 800, color: '#111', lineHeight: 1.3 }}>
                  {c.title}
                </p>
                <p style={{ margin: '0 0 4px', fontSize: 11.5, color: '#888' }}>{c.issuer}</p>
                <p style={{ margin: 0, fontSize: 10.5, color: '#BBB', fontWeight: 700 }}>
                  {c.date || c.date_issued}
                </p>
                {clickable && (
                  <p style={{ margin: '6px 0 0', fontSize: 10, color: cAccent, fontWeight: 800, letterSpacing: 0.3 }}>
                    {hasPdf ? 'Open PDF ↗' : 'View Certificate ↗'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selected && <CertModal cert={selected} theme={theme} onClose={() => setSelected(null)} />}
    </>
  )
}