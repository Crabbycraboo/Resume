import { useState } from 'react'
import Tag from './Tag'

export const isLiveUrl = url =>
  !!url && (url.includes('vercel.app') || url.includes('netlify.app') || url.includes('github.io') || url.includes('pages.dev'))

export default function ProjectCard({ project, theme, onClick }) {
  const [hov, setHov] = useState(false)

  const t          = theme || {}
  const accent     = t.accent    || '#E8527A'
  const accentAlt  = t.accentAlt || accent
  const cardGlass  = t.cardGlass || 'rgba(255,255,255,0.82)'
  const cardBorder = t.cardBorder|| '#EEE'
  const accentLight= t.accentLight || '#FFF5F5'

  const initial   = project.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const isSeries  = project.tags?.some(t => t === 'Series' || t === 'Multi-page')
  const isLive    = isLiveUrl(project.image_url) || isLiveUrl(project.fb_link)
  const bgImage   = project.image_url && !isLiveUrl(project.image_url) ? project.image_url : null

  const parseImageUrls = val => {
    if (!val) return []
    if (Array.isArray(val)) return val
    try { return JSON.parse(val) } catch { return [] }
  }
  const imageCount = parseImageUrls(project.image_urls).length || (bgImage ? 1 : 0)

  return (
    <div
      className="proj-card"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: cardGlass,
        borderRadius: 18,
        border: `1.5px solid ${hov ? accent + '55' : cardBorder}`,
        overflow: 'hidden', cursor: 'pointer',
        boxShadow: hov ? `0 16px 40px ${accent}18` : '0 2px 8px rgba(0,0,0,0.04)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Card image/header */}
      <div style={{
        height: 108,
        background: bgImage
          ? `url(${bgImage}) center/cover no-repeat`
          : `linear-gradient(135deg, ${accentLight}, ${accent}20)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${cardBorder}`,
        position: 'relative',
      }}>
        {!bgImage && (
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: '#fff',
            boxShadow: `0 6px 20px ${accent}55`,
            letterSpacing: 0.5,
          }}>
            {initial}
          </div>
        )}

        {/* Hover overlay */}
        {bgImage && hov && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: 9, right: 9, display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'flex-end' }}>
          {isLive && (
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: 0.3,
              background: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
              color: '#fff', padding: '3px 9px', borderRadius: 20,
              boxShadow: `0 3px 10px ${accent}55`,
            }}>
              🚀 LIVE
            </span>
          )}
          {!isLive && project.fb_link && (
            <span style={{ fontSize: 10, fontWeight: 900, background: `linear-gradient(135deg,${accent},${accentAlt})`, color: '#fff', padding: '3px 9px', borderRadius: 20 }}>
              LIVE ✦
            </span>
          )}
          {isSeries && imageCount > 1 && (
            <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '3px 9px', borderRadius: 20 }}>
              📸 {imageCount}
            </span>
          )}
          {isSeries && imageCount <= 1 && (
            <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '3px 9px', borderRadius: 20 }}>
              SERIES
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{ margin: '0 0 7px', fontSize: 13.5, fontWeight: 900, color: '#111', lineHeight: 1.35, letterSpacing: -0.2 }}>
          {project.title}
        </h3>
        <p style={{
          margin: '0 0 12px', fontSize: 12, color: '#888', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.tags?.slice(0, 3).map(t => <Tag key={t} label={t} theme={theme} />)}
          {project.tags?.length > 3 && (
            <Tag label={`+${project.tags.length - 3}`} theme={{ tag: '#999', tagBg: '#F3F4F6', border: '#E5E7EB' }} />
          )}
        </div>
      </div>
    </div>
  )
}