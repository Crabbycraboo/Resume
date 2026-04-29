import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal'
import Tag from './Tag'

export default function NichePanel({ niche, projects, certificates }) {
  const [selectedItem, setSelectedItem] = useState(null)
  if (!niche) return null

  // theme is already parsed+merged in App.jsx — safe to use directly
  const t = niche.theme || {}
  const accent      = t.accent      || '#E8527A'
  const accentAlt   = t.accentAlt   || accent
  const accentDark  = t.accentDark  || '#111'
  const accentLight = t.accentLight || '#FFF'
  const border      = t.border      || '#EEE'
  const cardGlass   = t.cardGlass   || 'rgba(255,255,255,0.8)'
  const bannerBg    = t.bannerBg    || accentLight
  const gradHero    = t.gradHero    || `linear-gradient(135deg,${accent},${accentAlt})`

  const skills = niche.skills || []

  return (
    <div style={{animation:'fadeUp 0.38s cubic-bezier(0.22,1,0.36,1) both'}}>

      {/* ── NICHE BANNER ── */}
      <div style={{
        borderRadius:22, background:bannerBg,
        border:`1.5px solid ${border}`,
        padding:'30px 34px 28px', marginBottom:44,
        display:'flex', alignItems:'flex-start', gap:22, flexWrap:'wrap',
        position:'relative', overflow:'hidden',
      }}>
        {/* Decorative orb */}
        <div style={{
          position:'absolute',top:-60,right:-40,width:220,height:220,borderRadius:'50%',
          background:`radial-gradient(circle,${accent}18 0%,transparent 70%)`,
          pointerEvents:'none',
        }}/>
        <div style={{
          position:'absolute',bottom:-40,left:-20,width:160,height:160,borderRadius:'50%',
          background:`radial-gradient(circle,${accentAlt}12 0%,transparent 70%)`,
          pointerEvents:'none',
        }}/>

        {/* Icon */}
        {niche.icon && (
          <div style={{
            width:58,height:58,borderRadius:18,flexShrink:0,
            background:gradHero,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:24,boxShadow:`0 10px 28px ${accent}44`,color:'#fff',
          }}>
            {niche.icon}
          </div>
        )}

        <div style={{flex:1,minWidth:0,position:'relative',zIndex:1}}>
          <p style={{margin:'0 0 4px',fontSize:10,fontWeight:900,color:accent,letterSpacing:2.5,textTransform:'uppercase'}}>
            {niche.tagline || ''}
          </p>
          <h2 style={{margin:'0 0 10px',fontSize:26,fontWeight:900,color:'#111',letterSpacing:-0.5}}>
            {niche.name}
          </h2>
          {niche.description && (
            <p style={{margin:'0 0 14px',fontSize:14,color:'#666',lineHeight:1.8,maxWidth:580}}>
              {niche.description}
            </p>
          )}
          {skills.length > 0 && (
            <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
              {skills.map(s => <Tag key={s} label={s} theme={t}/>)}
            </div>
          )}
        </div>

        {/* Stats chips */}
        <div style={{display:'flex',gap:10,flexShrink:0,position:'relative',zIndex:1}}>
          {projects.length > 0 && (
            <div style={{
              textAlign:'center',background:cardGlass,
              borderRadius:16,padding:'14px 20px',
              border:`1.5px solid ${border}`,backdropFilter:'blur(10px)',
            }}>
              <p style={{margin:0,fontSize:28,fontWeight:900,color:accent,lineHeight:1}}>{projects.length}</p>
              <p style={{margin:'4px 0 0',fontSize:9,color:'#AAA',fontWeight:800,textTransform:'uppercase',letterSpacing:1.5}}>Projects</p>
            </div>
          )}
          {certificates.length > 0 && (
            <div style={{
              textAlign:'center',background:cardGlass,
              borderRadius:16,padding:'14px 20px',
              border:`1.5px solid ${border}`,backdropFilter:'blur(10px)',
            }}>
              <p style={{margin:0,fontSize:28,fontWeight:900,color:accent,lineHeight:1}}>{certificates.length}</p>
              <p style={{margin:'4px 0 0',fontSize:9,color:'#AAA',fontWeight:800,textTransform:'uppercase',letterSpacing:1.5}}>Certs</p>
            </div>
          )}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <section style={{marginBottom:52}}>
          <SectionHeader label="Portfolio Projects" count={projects.length} theme={t}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(252px,1fr))',gap:18}}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} theme={t} onClick={()=>setSelectedItem(p)}/>
            ))}
          </div>
        </section>
      )}

      {/* ── CERTIFICATES ── */}
      {certificates.length > 0 && (
        <section style={{marginBottom:24}}>
          <SectionHeader label="Certifications" count={certificates.length} theme={t}/>
          <CertGrid certs={certificates} theme={t}/>
        </section>
      )}

      {projects.length === 0 && certificates.length === 0 && (
        <div style={{textAlign:'center',padding:'80px 20px',color:'#DDD'}}>
          <div style={{fontSize:38,marginBottom:14}}>✦</div>
          <p style={{fontWeight:700,fontSize:14}}>No content yet for this niche</p>
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} theme={t} onClose={()=>setSelectedItem(null)}/>
      )}
    </div>
  )
}

function SectionHeader({ label, count, theme }) {
  const accent    = theme?.accent    || '#E8527A'
  const accentAlt = theme?.accentAlt || accent
  const accentDark= theme?.accentDark|| '#111'
  const accentLight=theme?.accentLight||'#FFF5'
  const border    = theme?.border    || '#EEE'
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:22}}>
      <div style={{width:5,height:22,borderRadius:3,background:`linear-gradient(180deg,${accent},${accentAlt})`}}/>
      <h3 style={{margin:0,fontSize:11,fontWeight:900,color:'#333',textTransform:'uppercase',letterSpacing:2.5}}>
        {label}
      </h3>
      <span style={{
        fontSize:11,fontWeight:900,color:accentDark,
        background:accentLight,padding:'3px 11px',borderRadius:20,
        border:`1.5px solid ${border}`,
      }}>
        {count}
      </span>
    </div>
  )
}