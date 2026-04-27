import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal'
import Tag from './Tag'

export default function NichePanel({ niche, projects, certificates }) {
  const [selectedItem, setSelectedItem] = useState(null)

  if (!niche) return null

  const { theme } = niche
  const accentColor = theme?.accent || '#D4607A'
  const accentLight = theme?.accentLight || '#FDE8ED'
  const accentDark = theme?.accentDark || '#8B1A32'

  const skills = Array.isArray(niche.skills)
    ? niche.skills
    : typeof niche.skills === 'string'
      ? (() => { try { return JSON.parse(niche.skills) } catch { return [] } })()
      : []

  return (
    <div style={{ animation: 'fadeUp 0.35s ease both' }}>

      {/* ── NICHE BANNER ── */}
      <div style={{
        borderRadius: 20,
        background: `linear-gradient(135deg, ${accentLight}, ${accentColor}15)`,
        border: `1.5px solid ${accentColor}22`,
        padding: '28px 32px',
        marginBottom: 36,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        {/* Icon circle */}
        {niche.icon && (
          <div style={{
            width: 52, height: 52, borderRadius: 15,
            background: accentColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
            boxShadow: `0 6px 20px ${accentColor}44`,
          }}>
            {niche.icon}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 900, color: '#111' }}>{niche.name}</h2>
          {niche.description && (
            <p style={{ margin: '0 0 14px', fontSize: 13.5, color: '#666', lineHeight: 1.7, maxWidth: 600 }}>
              {niche.description}
            </p>
          )}
          {skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map(s => <Tag key={s} label={s} theme={theme} />)}
            </div>
          )}
        </div>
        {/* Stats chips */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          {projects.length > 0 && (
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 12, padding: '10px 16px', border: `1px solid ${accentColor}22` }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: accentColor }}>{projects.length}</p>
              <p style={{ margin: 0, fontSize: 10, color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Projects</p>
            </div>
          )}
          {certificates.length > 0 && (
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 12, padding: '10px 16px', border: `1px solid ${accentColor}22` }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: accentColor }}>{certificates.length}</p>
              <p style={{ margin: 0, fontSize: 10, color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Certs</p>
            </div>
          )}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 18, borderRadius: 2, background: accentColor }} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Portfolio Projects
            </h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: accentDark, background: accentLight, padding: '2px 9px', borderRadius: 20, border: `1px solid ${accentColor}33` }}>
              {projects.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(245px,1fr))', gap: 16 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} theme={theme} onClick={() => setSelectedItem(p)} />
            ))}
          </div>
        </section>
      )}

      {/* ── CERTIFICATES ── */}
      {certificates && certificates.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 18, borderRadius: 2, background: accentColor }} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Certifications
            </h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: accentDark, background: accentLight, padding: '2px 9px', borderRadius: 20, border: `1px solid ${accentColor}33` }}>
              {certificates.length}
            </span>
          </div>
          <CertGrid certs={certificates} theme={theme} />
        </section>
      )}

      {/* Empty state */}
      {projects.length === 0 && certificates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#CCC' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
          <p style={{ fontWeight: 600 }}>No content yet for this niche</p>
        </div>
      )}

      {/* MODAL */}
      {selectedItem && (
        <Modal item={selectedItem} theme={theme} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}