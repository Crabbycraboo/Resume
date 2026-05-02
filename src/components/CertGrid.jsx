import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const isPdf = url => url && url.toLowerCase().includes('.pdf')

function CertModal({ cert, theme, onClose }) {
  const [imgStatus, setImgStatus] = useState('loading')

  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const accent      = cert.color || theme?.accent    || '#E8527A'
  const accentAlt   = cert.color || theme?.accentAlt || accent
  const gradHero    = theme?.gradHero   || `linear-gradient(135deg,${accent},${accentAlt})`
  const accentLight = theme?.accentLight|| '#FFF0F3'
  const border      = theme?.border     || '#F8C0CC'

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.75)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 720,
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.32)',
          animation: 'certModalPop 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <style>{`
          @keyframes certModalPop {
            from { opacity:0; transform:scale(0.92) translateY(12px) }
            to   { opacity:1; transform:scale(1) translateY(0) }
          }
          @keyframes certShimmer {
            from { background-position: 200% 0 }
            to   { background-position: -200% 0 }
          }
        `}</style>

        {/* Top gradient stripe */}
        <div style={{
          height: 7,
          background: gradHero,
          borderRadius: '24px 24px 0 0',
          position: 'sticky', top: 0, zIndex: 1,
        }} />

        {/* Header */}
        <div style={{
          padding: '22px 28px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: '#111' }}>
              {cert.title}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#999' }}>
              {cert.issuer} · {cert.date || cert.date_issued}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F5F5F5', border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: '#666',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              marginLeft: 12,
            }}
          >✕</button>
        </div>

        {/* Image area */}
        <div style={{ padding: '0 28px 28px' }}>

          {/* Shimmer while loading */}
          {imgStatus === 'loading' && (
            <div style={{
              width: '100%', height: 260, borderRadius: 14,
              background: 'linear-gradient(90deg,#F3F3F3 25%,#EAEAEA 50%,#F3F3F3 75%)',
              backgroundSize: '200% 100%',
              animation: 'certShimmer 1.2s ease infinite',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ color: '#CCC', fontSize: 13, fontWeight: 700 }}>Loading…</p>
            </div>
          )}

          {/* 404 / broken URL fallback */}
          {imgStatus === 'error' && (
            <div style={{
              width: '100%', borderRadius: 14,
              background: accentLight,
              border: `1.5px dashed ${border}`,
              padding: '52px 24px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 10,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 38 }}>🏆</div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#111' }}>{cert.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{cert.issuer}</p>
              <p style={{ margin: '6px 0 0', fontSize: 11, color: '#BBB', maxWidth: 300 }}>
                Certificate image unavailable — the file may have been moved or renamed in Supabase storage.
              </p>
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noreferrer" style={{
                  marginTop: 10, padding: '10px 22px', borderRadius: 10,
                  background: gradHero, color: '#fff',
                  textDecoration: 'none', fontWeight: 800, fontSize: 13,
                }}>
                  Verify Credential ↗
                </a>
              )}
            </div>
          )}

          {/* Actual image */}
          <img
            src={cert.image_url}
            alt={cert.title}
            onLoad={() => setImgStatus('ok')}
            onError={() => setImgStatus('error')}
            style={{
              width: '100%', borderRadius: 14,
              border: '1px solid #EDEDED',
              display: imgStatus === 'ok' ? 'block' : 'none',
            }}
          />

          {cert.credential_url && imgStatus === 'ok' && (
            <a href={cert.credential_url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
              padding: '11px 22px', borderRadius: 12, background: gradHero,
              color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 13,
            }}>
              Verify Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  )

  // Portal renders directly into document.body — bypasses ALL parent z-index/overflow/transform stacking contexts
  return createPortal(modalContent, document.body)
}

export default function CertGrid({ certs, theme }) {
  const [selected, setSelected] = useState(null)

  if (!certs || !certs.length) return null

  const accent     = theme?.accent     || '#E8527A'
  const accentAlt  = theme?.accentAlt  || accent
  const certBg     = theme?.certBg     || 'rgba(255,255,255,0.92)'
  const certBorder = theme?.certBorder || '#EEEEEE'

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
        gap: 13,
      }}>
        {certs.map(c => {
          const hasPdf    = isPdf(c.image_url)
          const hasImage  = !!(c.image_url && !hasPdf)
          const clickable = hasPdf || hasImage || !!c.credential_url
          const cAccent   = c.color || accent

          function handleClick() {
            if (!clickable) return
            if (hasPdf)               window.open(c.image_url, '_blank')
            else if (hasImage)        setSelected(c)
            else if (c.credential_url) window.open(c.credential_url, '_blank')
          }

          return (
            <div
              key={c.id}
              onClick={handleClick}
              style={{
                background: certBg, borderRadius: 16,
                border: `1.5px solid ${certBorder}`,
                padding: '16px 18px 16px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
                cursor: clickable ? 'pointer' : 'default',
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => {
                if (!clickable) return
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 30px ${cAccent}22`
                e.currentTarget.style.borderColor = `${cAccent}66`
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                e.currentTarget.style.borderColor = certBorder
              }}
            >
              {/* Left gradient bar */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 5,
                background: `linear-gradient(180deg,${cAccent},${accentAlt})`,
                borderRadius: '16px 0 0 16px',
              }} />

              {/* Icon */}
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg,${cAccent}20,${cAccent}35)`,
                border: `1.5px solid ${cAccent}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {hasPdf ? '📄' : hasImage ? '🏆' : '✓'}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 800, color: '#111', lineHeight: 1.35 }}>
                  {c.title}
                </p>
                <p style={{ margin: '0 0 4px', fontSize: 11.5, color: '#888', fontWeight: 600 }}>
                  {c.issuer}
                </p>
                <p style={{ margin: 0, fontSize: 10.5, color: '#BBBBBB', fontWeight: 700 }}>
                  {c.date || c.date_issued}
                </p>
                {clickable && (
                  <p style={{ margin: '6px 0 0', fontSize: 10, color: cAccent, fontWeight: 900, letterSpacing: 0.3 }}>
                    {hasPdf ? 'Open PDF ↗' : 'View Certificate ↗'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <CertModal cert={selected} theme={theme} onClose={() => setSelected(null)} />
      )}
    </>
  )
}