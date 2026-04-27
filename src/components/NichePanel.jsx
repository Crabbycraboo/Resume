import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal' // <--- Ensure this import is here

export default function NichePanel({ niche, projects, certificates }) {
  const [selectedItem, setSelectedItem] = useState(null) // Renamed for clarity
  const { theme } = niche

  const skills = Array.isArray(niche.skills)
    ? niche.skills
    : typeof niche.skills === 'string'
      ? JSON.parse(niche.skills)
      : []

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      {/* ... Banner code ... */}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: '#BBB' }}>
            Portfolio Projects ({projects.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(245px,1fr))', gap: 16 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} theme={theme} onClick={() => setSelectedItem(p)} />
            ))}
          </div>
        </div>
      )}

      {/* THE MODAL LIVES HERE NOW */}
      {selectedItem && (
        <Modal 
          item={selectedItem} 
          theme={theme} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  )
}