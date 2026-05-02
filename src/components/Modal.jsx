import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Tag from './Tag'

const isLiveUrl = url =>
  !!url && (url.includes('vercel.app')||url.includes('netlify.app')||url.includes('github.io')||url.includes('pages.dev'))

const parseJsonField = val => {
  if (!val) return []
  if (Array.isArray(val)) return val
  try { return JSON.parse(val) } catch { return [] }
}

export default function Modal({ item, theme, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)

  const t           = theme || {}
  const accent      = t.accent      || '#E8527A'
  const accentAlt   = t.accentAlt   || accent
  const accentDark  = t.accentDark  || '#8B1A32'
  const accentLight = t.accentLight || '#FFF0F3'
  const border      = t.border      || '#F8C0CC'
  const gradHero    = t.gradHero    || `linear-gradient(135deg,${accent},${accentAlt})`

  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const liveUrl    = isLiveUrl(item.image_url) ? item.image_url : isLiveUrl(item.fb_link) ? item.fb_link : null
  const imageUrls  = parseJsonField(item.image_urls)
  const singleImg  = item.image_url && !isLiveUrl(item.image_url) && imageUrls.length === 0 ? item.image_url : null
  const images     = imageUrls.length > 0 ? imageUrls : singleImg ? [singleImg] : []
  const hasImages  = images.length > 0
  const isGallery  = images.length > 1
  const currentImg = images[imgIdx] || null

  const fbUrls    = parseJsonField(item.fb_urls)
  const hasFbLink = item.fb_link && !isLiveUrl(item.fb_link) && item.fb_link.trim() !== ''
  const hasFbUrls = fbUrls.length > 0

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.72)',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes projModalPop {
          from { opacity:0; transform:scale(0.92) translateY(12px) }
          to   { opacity:1; transform:scale(1) translateY(0) }
        }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24,
          width: '100%',
          maxWidth: hasImages ? 740 : 580,
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.28)',
          animation: 'projModalPop 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          flexShrink: 0,
        }}
      >
        {/* Gradient stripe */}
        <div style={{
          height: 7, background: gradHero,
          borderRadius: '24px 24px 0 0',
          position: 'sticky', top: 0, zIndex: 1,
        }} />

        <div style={{ padding: '26px 30px 32px' }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
            <div style={{ flex:1, paddingRight:12 }}>
              <h2 style={{ margin:'0 0 10px', fontSize:21, fontWeight:900, color:'#111', lineHeight:1.25, letterSpacing:-0.5 }}>
                {item.title}
              </h2>
              <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                {liveUrl && (
                  <span style={{ fontSize:11, color:'#fff', fontWeight:800, background:gradHero, padding:'3px 11px', borderRadius:20, boxShadow:`0 3px 10px ${accent}44` }}>
                    🚀 Live Project
                  </span>
                )}
                {isGallery && (
                  <span style={{ fontSize:11, color:accentDark, fontWeight:800, background:accentLight, padding:'3px 11px', borderRadius:20, border:`1px solid ${border}` }}>
                    📸 {images.length} images
                  </span>
                )}
                {hasFbUrls && (
                  <span style={{ fontSize:11, color:accentDark, fontWeight:800, background:accentLight, padding:'3px 11px', borderRadius:20, border:`1px solid ${border}` }}>
                    🔗 {fbUrls.length} posts
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} style={{
              background:'#F5F5F5', border:'none', borderRadius:'50%',
              width:36, height:36, cursor:'pointer', fontSize:16, color:'#666',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>✕</button>
          </div>

          {/* Gallery */}
          {hasImages && (
            <div style={{ marginBottom:20 }}>
              <div style={{
                borderRadius:16, overflow:'hidden',
                border:`1px solid ${border}44`,
                marginBottom: isGallery ? 10 : 0,
                position:'relative', background:'#F8F8F8',
              }}>
                <img src={currentImg} alt={`${item.title} ${imgIdx+1}`}
                  style={{ width:'100%', display:'block', maxHeight:400, objectFit:'contain' }}/>
                {isGallery && (
                  <>
                    <button onClick={()=>setImgIdx(i=>(i-1+images.length)%images.length)}
                      style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', width:40, height:40, borderRadius:'50%', background:'rgba(0,0,0,0.5)', border:'none', color:'#fff', fontSize:22, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
                    <button onClick={()=>setImgIdx(i=>(i+1)%images.length)}
                      style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', width:40, height:40, borderRadius:'50%', background:'rgba(0,0,0,0.5)', border:'none', color:'#fff', fontSize:22, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
                    <div style={{ position:'absolute', bottom:10, right:12, background:'rgba(0,0,0,0.55)', color:'#fff', fontSize:11, fontWeight:800, padding:'4px 11px', borderRadius:20 }}>
                      {imgIdx+1} / {images.length}
                    </div>
                  </>
                )}
              </div>
              {isGallery && (
                <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4 }}>
                  {images.map((img,i)=>(
                    <img key={i} src={img} alt={`thumb ${i+1}`} onClick={()=>setImgIdx(i)}
                      style={{ width:66, height:50, objectFit:'cover', borderRadius:9, flexShrink:0, cursor:'pointer',
                        border:`2.5px solid ${i===imgIdx?accent:'#E5E7EB'}`,
                        opacity:i===imgIdx?1:0.55, transition:'all 0.15s' }}/>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p style={{ margin:'0 0 18px', fontSize:14, lineHeight:1.88, color:'#555' }}>{item.description}</p>

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:24 }}>
              {item.tags.map(tag=><Tag key={tag} label={tag} theme={t}/>)}
            </div>
          )}

          {/* Actions */}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'12px 24px', borderRadius:12, background:gradHero,
                color:'#fff', textDecoration:'none', fontSize:13, fontWeight:900,
                boxShadow:`0 6px 20px ${accent}44`,
              }}>🚀 View Live Project →</a>
            )}
            {hasFbLink && (
              <a href={item.fb_link} target="_blank" rel="noreferrer" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'12px 24px', borderRadius:12, background:accentLight,
                color:accentDark, textDecoration:'none', fontSize:13, fontWeight:800,
                border:`1.5px solid ${border}`,
              }}>View on Facebook →</a>
            )}
            {hasFbUrls && (
              <div style={{ width:'100%' }}>
                <p style={{ margin:'0 0 8px', fontSize:10, fontWeight:900, color:'#CCC', textTransform:'uppercase', letterSpacing:1.5 }}>
                  Facebook Posts ({fbUrls.length})
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                  {fbUrls.map((url,i)=>(
                    <a key={i} href={url} target="_blank" rel="noreferrer" style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      padding:'8px 14px', borderRadius:9, background:accentLight,
                      color:accentDark, textDecoration:'none', fontSize:12, fontWeight:800,
                      border:`1px solid ${border}`,
                    }}>Post {i+1} →</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}