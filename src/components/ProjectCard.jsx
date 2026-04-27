import { useState } from 'react'
import Tag from './Tag'

// Shared helper — also used by Modal
export const isLiveUrl = (url) =>
  !!url && (
    url.includes('vercel.app') ||
    url.includes('netlify.app') ||
    url.includes('github.io') ||
    url.includes('pages.dev')
  )

export default function ProjectCard({ project, theme, onClick }) {
  const [hov, setHov] = useState(false)
  const initial = project.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()

  const isSeries = project.tags?.some(t => t === 'Series' || t === 'Multi-page')

  // A project is "live" if EITHER image_url OR fb_link is a deploy URL
  const isLive = isLiveUrl(project.image_url) || isLiveUrl(project.fb_link)

  // Only use image_url as a background image if it's a real image (not a live URL)
  const bgImage = project.image_url && !isLiveUrl(project.image_url) ? project.image_url : null

  // Parse image_urls safely
  const parseImageUrls = (val) => {
    if (!val) return []
    if (Array.isArray(val)) return val
    try { return JSON.parse(val) } catch { return [] }
  }
  const imageCount = parseImageUrls(project.image_urls).length || (bgImage ? 1 : 0)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: 14,
        border: `1.5px solid ${hov ? theme.accent + '66' : '#EDEDED'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 12px 32px ${theme.accent}20` : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.22s ease',
      }}
    >
      {/* Card header */}
      <div style={{
        height: 100,
        background: bgImage
          ? `url(${bgImage}) center/cover no-repeat`
          : `linear-gradient(135deg,${theme.accentLight},${theme.accent}18)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${theme.border}44`,
        position: 'relative',
      }}>
        {/* Initial avatar when no real image */}
        {!bgImage && (
          <div style={{
            width: 48, height: 48, borderRadius: 13,
            background: theme.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 900, color: '#fff',
            boxShadow: `0 4px 14px ${theme.accent}55`,
          }}>
            {initial}
          </div>
        )}

        {/* Hover overlay for image cards */}
        {bgImage && hov && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'flex-end' }}>
          {isLive && (
            <span style={{ fontSize: 10, background: theme.accent, color: '#fff', padding: '2px 7px', borderRadius: 20, fontWeight: 800 }}>
              🚀 LIVE
            </span>
          )}
          {!isLive && project.fb_link && (
            <span style={{ fontSize: 10, background: theme.accent, color: '#fff', padding: '2px 7px', borderRadius: 20, fontWeight: 800 }}>
              LIVE ✦
            </span>
          )}
          {isSeries && imageCount > 1 && (
            <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>
              📸 {imageCount}
            </span>
          )}
          {isSeries && imageCount <= 1 && (
            <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>
              SERIES
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 13.5, fontWeight: 800, color: '#111', lineHeight: 1.4 }}>
          {project.title}
        </h3>
        <p style={{
          margin: '0 0 10px', fontSize: 12, color: '#888', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.tags?.slice(0, 3).map(t => <Tag key={t} label={t} theme={theme} />)}
          {project.tags?.length > 3 && (
            <Tag label={`+${project.tags.length - 3}`} theme={{ tag: '#888', tagBg: '#F3F4F6', border: '#E5E7EB' }} />
          )}
        </div>
      </div>
    </div>
  )
}