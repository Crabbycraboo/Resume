import { useEffect, useState } from 'react'
import Tag from './Tag'

const isLiveUrl = (url) =>
  !!url && (
    url.includes('vercel.app') ||
    url.includes('netlify.app') ||
    url.includes('github.io') ||
    url.includes('pages.dev')
  )

const parseJsonField = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  try { return JSON.parse(val) } catch { return [] }
}

export default function Modal({ item, theme, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // ── Resolve live URL ──────────────────────────────────────────────
  // fb_link can be a live deploy URL (missyoubibi pattern)
  // image_url can be a live deploy URL (yakap pattern)
  const liveUrl =
    isLiveUrl(item.image_url) ? item.image_url :
    isLiveUrl(item.fb_link)   ? item.fb_link   :
    null

  // ── Resolve images ────────────────────────────────────────────────
  // image_urls array takes priority
  // Single image_url is used only when it is NOT a live URL
  const imageUrls  = parseJsonField(item.image_urls)
  const singleImg  = item.image_url && !isLiveUrl(item.image_url) && imageUrls.length === 0
    ? item.image_url
    : null

  const images     = imageUrls.length > 0 ? imageUrls : singleImg ? [singleImg] : []
  const hasImages  = images.length > 0
  const isGallery  = images.length > 1
  const currentImg = images[imgIdx] || null

  // ── Resolve action links ──────────────────────────────────────────
  const fbUrls    = parseJsonField(item.fb_urls)
  // fb_link is a regular Facebook link only if it's not a live deploy URL
  const hasFbLink = item.fb_link && !isLiveUrl(item.fb_link) && item.fb_link.trim() !== ''
  const hasFbUrls = fbUrls.length > 0

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.65)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        backdropFilter: 'blur(5px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20,
          maxWidth: hasImages ? 720 : 580, width: '100%',
          maxHeight: '92vh', overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Colour stripe */}
        <div style={{
          height: 8,
          background: `linear-gradient(90deg,${theme.accent},${theme.accentAlt})`,
          borderRadius: '20px 20px 0 0',
          position: 'sticky', top: 0, zIndex: 1,
        }} />

        <div style={{ padding: '24px 28px 28px' }}>

          {/* ── Header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#111', lineHeight: 1.3 }}>
                {item.title}
              </h2>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {liveUrl && (
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, background: theme.accent, padding: '2px 9px', borderRadius: 20 }}>
                    🚀 Live Project
                  </span>
                )}
                {isGallery && (
                  <span style={{ fontSize: 11, color: theme.accentDark, fontWeight: 700, background: theme.accentLight, padding: '2px 9px', borderRadius: 20, border: `1px solid ${theme.border}` }}>
                    📸 {images.length} images
                  </span>
                )}
                {hasFbUrls && (
                  <span style={{ fontSize: 11, color: theme.accentDark, fontWeight: 700, background: theme.accentLight, padding: '2px 9px', borderRadius: 20, border: `1px solid ${theme.border}` }}>
                    🔗 {fbUrls.length} posts
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >✕</button>
          </div>

          {/* ── Image Gallery ── */}
          {hasImages && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${theme.border}44`, marginBottom: isGallery ? 10 : 0, position: 'relative', background: '#F5F5F5' }}>
                <img
                  src={currentImg}
                  alt={`${item.title} ${imgIdx + 1}`}
                  style={{ width: '100%', display: 'block', maxHeight: 380, objectFit: 'contain' }}
                />
                {isGallery && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                      style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >‹</button>
                    <button
                      onClick={() => setImgIdx(i => (i + 1) % images.length)}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >›</button>
                    <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>
                      {imgIdx + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {isGallery && (
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
                  {images.map((img, i) => (
                    <img
                      key={i} src={img} alt={`thumb ${i + 1}`}
                      onClick={() => setImgIdx(i)}
                      style={{ width: 62, height: 46, objectFit: 'cover', borderRadius: 7, flexShrink: 0, cursor: 'pointer', border: `2px solid ${i === imgIdx ? theme.accent : '#E5E7EB'}`, opacity: i === imgIdx ? 1 : 0.6, transition: 'all 0.15s' }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Description ── */}
          <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.8, color: '#444' }}>
            {item.description}
          </p>

          {/* ── Tags ── */}
          {item.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {item.tags.map(t => <Tag key={t} label={t} theme={theme} />)}
            </div>
          )}

          {/* ── Action buttons ── */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>

            {/* 🚀 Live project button */}
            {liveUrl && (
              <a
                href={liveUrl} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: theme.accent, color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 800, boxShadow: `0 4px 14px ${theme.accent}44` }}
              >
                🚀 View Live Project →
              </a>
            )}

            {/* Single Facebook link */}
            {hasFbLink && (
              <a
                href={item.fb_link} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: theme.accentLight, color: theme.accentDark, textDecoration: 'none', fontSize: 13, fontWeight: 800, border: `1px solid ${theme.border}` }}
              >
                View on Facebook →
              </a>
            )}

            {/* Multiple Facebook links (series) */}
            {hasFbUrls && (
              <div style={{ width: '100%' }}>
                <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 800, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Facebook Posts ({fbUrls.length})
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {fbUrls.map((url, i) => (
                    <a
                      key={i} href={url} target="_blank" rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 8, background: theme.accentLight, color: theme.accentDark, textDecoration: 'none', fontSize: 12, fontWeight: 700, border: `1px solid ${theme.border}` }}
                    >
                      Post {i + 1} →
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}