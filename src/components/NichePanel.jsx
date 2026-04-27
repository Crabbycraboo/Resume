import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal'

export default function NichePanel({ niche, projects, certificates, setModal }) {
  const { theme } = niche
  
  // This automatically picks up whatever is in the 'skills' column for that niche
  const skills = Array.isArray(niche.skills) ? niche.skills : []

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>

      {/* ── Banner ── */}
      <div style={{
        background: theme.grad,
        borderRadius: 18, padding: '30px 34px', marginBottom: 32,
        border: `1px solid ${theme.border}55`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: theme.accent, opacity: 0.06 }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 13, background: theme.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff', flexShrink: 0,
            boxShadow: `0 4px 14px ${theme.accent}44`,
          }}>
            {niche.icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#111' }}>{niche.name}</h2>
              {niche.is_featured && (
                <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: theme.accent, color: '#fff', fontWeight: 800 }}>FEATURED</span>
              )}
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: theme.accent, textTransform: 'uppercase', letterSpacing: 1 }}>{niche.tagline}</p>
            <p style={{ margin: 0, fontSize: 14, color: '#555', lineHeight: 1.7, maxWidth: 520 }}>{niche.description}</p>
          </div>
        </div>
      </div>

      {/* ── Skills (from Supabase niche.skills) ── */}
    {skills.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ textTransform: 'uppercase', fontSize: 12, color: '#BBB' }}>Core Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {skills.map(skill => (
              <span key={skill} style={{ background: theme.accentLight, color: theme.accentDark }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Projects ── */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 12, fontWeight: 700, color: '#BBB', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Portfolio Projects ({projects.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(245px,1fr))', gap: 16 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} theme={theme} onClick={() => setModal(p)} />
            ))}
          </div>
        </div>
      )}

      {/* ── Certificates ── */}
      {certificates && certificates.length > 0 && (
        <CertGrid certs={certificates} theme={theme} />
      )}

      {modal && <Modal item={modal} theme={theme} onClose={() => setModal(null)} />}
    </div>
  )
}