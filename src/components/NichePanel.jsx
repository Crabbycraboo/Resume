import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal'
import Tag from './Tag'

export default function NichePanel({ niche, projects, certificates }) {
  const [selectedItem, setSelectedItem] = useState(null)
  if (!niche) return null

  const t = niche.theme || {}
  const accent      = t.accent      || '#E8527A'
  const accentAlt   = t.accentAlt   || accent
  const accentDark  = t.accentDark  || '#111'
  const accentLight = t.accentLight || '#FFF'
  const bannerBg    = t.bannerBg    || t.grad || accentLight
  const cardGlass   = t.cardGlass   || 'rgba(255,255,255,0.75)'
  const border      = t.border      || '#EEE'

  const skills = Array.isArray(niche.skills)
    ? niche.skills
    : typeof niche.skills === 'string'
      ? (() => { try { return JSON.parse(niche.skills) } catch { return [] } })()
      : []

  return (
    <div style={{ animation: 'fadeUp 0.38s cubic-bezier(0.22,1,0.36,1) both' }}>

      {/* ── NICHE BANNER ── */}
      <div style={{
        borderRadius: 22, background: bannerBg,
        border: `1.5px solid ${border}`,
        padding: '28px 32px 24px', marginBottom: 40,
        display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle decorative orb */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)`,
          top: -60, right: -40, pointerEvents: 'none',
        }} />

        {/* Icon */}
        {niche.icon && (
          <div style={{
            width: 54, height: 54, borderRadius: 16, flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, boxShadow: `0 8px 24px ${accent}44`,
            color: '#fff',
          }}>
            {niche.icon}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: 'uppercase' }}>
            {niche.tagline || 'Portfolio Niche'}
          </p>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, color: '#111', letterSpacing: -0.5 }}>
            {niche.name}
          </h2>
          {niche.description && (
            <p style={{ margin: '0 0 14px', fontSize: 13.5, color: '#666', lineHeight: 1.75, maxWidth: 580 }}>
              {niche.description}
            </p>
          )}
          {skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map(s => <Tag key={s} label={s} theme={t} />)}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          {projects.length > 0 && (
            <div style={{
              textAlign: 'center', background: cardGlass,
              borderRadius: 14, padding: '12px 18px',
              border: `1.5px solid ${border}`,
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: accent, lineHeight: 1 }}>{projects.length}</p>
              <p style={{ margin: '3px 0 0', fontSize: 9, color: '#AAA', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>Projects</p>
            </div>
          )}
          {certificates.length > 0 && (
            <div style={{
              textAlign: 'center', background: cardGlass,
              borderRadius: 14, padding: '12px 18px',
              border: `1.5px solid ${border}`,
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: accent, lineHeight: 1 }}>{certificates.length}</p>
              <p style={{ margin: '3px 0 0', fontSize: 9, color: '#AAA', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>Certs</p>
            </div>
          )}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 4, height: 20, borderRadius: 2,
              background: `linear-gradient(180deg, ${accent}, ${accentAlt})`,
            }} />
            <h3 style={{ margin: 0, fontSize: 11, fontWeight: 900, color: '#333', textTransform: 'uppercase', letterSpacing: 2 }}>
              Portfolio Projects
            </h3>
            <span style={{
              fontSize: 11, fontWeight: 800, color: accentDark,
              background: accentLight, padding: '3px 10px', borderRadius: 20,
              border: `1.5px solid ${border}`,
            }}>
              {projects.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(248px,1fr))', gap: 16 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} theme={t} onClick={() => setSelectedItem(p)} />
            ))}
          </div>
        </section>
      )}

      {/* ── CERTIFICATES ── */}
      {certificates.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 4, height: 20, borderRadius: 2,
              background: `linear-gradient(180deg, ${accent}, ${accentAlt})`,
            }} />
            <h3 style={{ margin: 0, fontSize: 11, fontWeight: 900, color: '#333', textTransform: 'uppercase', letterSpacing: 2 }}>
              Certifications
            </h3>
            <span style={{
              fontSize: 11, fontWeight: 800, color: accentDark,
              background: accentLight, padding: '3px 10px', borderRadius: 20,
              border: `1.5px solid ${border}`,
            }}>
              {certificates.length}
            </span>
          </div>
          <CertGrid certs={certificates} theme={t} />
        </section>
      )}

      {projects.length === 0 && certificates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#DDD' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>✦</div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>No content yet for this niche</p>
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} theme={t} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}