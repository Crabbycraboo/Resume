import { useState, useEffect, useRef } from 'react'
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { fetchProfile, fetchNiches, fetchAllProjects, fetchAllCertificates } from './lib/supabase'

export const NICHE_THEMES = {
  creative: {
    accent: '#E8527A', accentAlt: '#F0884A', accentDark: '#9B1F3A',
    accentLight: '#FFF0F3', tag: '#C0436A', tagBg: '#FFE4EE',
    border: '#F8C0CC', cardGlass: 'rgba(255,255,255,0.75)',
    cardBorder: '#F9C8D4', certBg: 'rgba(255,245,250,0.92)',
    certBorder: '#F8B8CC', bannerBg: 'linear-gradient(135deg,#FFF0EC,#FFE4F0,#FFF8F4)',
    grad: 'linear-gradient(160deg,#FFF0EC 0%,#FFE4F0 45%,#FFF5E8 100%)',
    gradHero: 'linear-gradient(135deg,#FF9A8B,#E8527A,#F0884A)',
    stripeBg: 'linear-gradient(90deg,#FFB7CE,#FF8BAA,#F472B6,#E8527A,#F0884A,#FFB7CE)',
  },
  admin: {
    accent: '#6B8FE8', accentAlt: '#9B77E0', accentDark: '#1E3A8A',
    accentLight: '#EEF2FF', tag: '#3B5FBF', tagBg: '#E0E8FF',
    border: '#C5D0F8', cardGlass: 'rgba(255,255,255,0.72)',
    cardBorder: '#D0DAFF', certBg: 'rgba(240,244,255,0.92)',
    certBorder: '#C5D0F8', bannerBg: 'linear-gradient(135deg,#EEF2FF,#F0EEFF,#F5F8FF)',
    grad: 'linear-gradient(160deg,#EEF2FF 0%,#F0EEFF 50%,#F5F8FF 100%)',
    gradHero: 'linear-gradient(135deg,#6B8FE8,#9B77E0)',
    stripeBg: 'linear-gradient(90deg,#6B8FE8,#9B77E0,#6B8FE8)',
  },
  ecommerce: {
    accent: '#E06835', accentAlt: '#F0A050', accentDark: '#7A2E10',
    accentLight: '#FFF4EE', tag: '#9B3510', tagBg: '#FFE8D8',
    border: '#FFCAAA', cardGlass: 'rgba(255,255,255,0.75)',
    cardBorder: '#FFD5B8', certBg: 'rgba(255,249,244,0.92)',
    certBorder: '#FFCFAA', bannerBg: 'linear-gradient(135deg,#FFF4EE,#FFF0E8,#FFF8F4)',
    grad: 'linear-gradient(160deg,#FFF4EE 0%,#FFF0E8 50%,#FFF8F4 100%)',
    gradHero: 'linear-gradient(135deg,#E06835,#F0A050)',
    stripeBg: 'linear-gradient(90deg,#E06835,#F0A050,#E06835)',
  },
}

function parseTheme(raw) {
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  try { return JSON.parse(raw) } catch { return {} }
}
function parseSkills(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(raw) } catch { return [] }
}

// ── DECORATIONS ───────────────────────────────────────────────────────────────
function CreativeDecorations() {
  return (
    <>
      <svg viewBox="0 0 300 300" style={{position:'absolute',top:-10,left:-10,width:320,height:320,opacity:0.6,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        {[0,35,70,105,140,175,210,245,280,315].map((rot,i)=>(
          <ellipse key={i} cx="110" cy="110" rx="52" ry="22" fill={i%3===0?'#FFB7CE':i%3===1?'#FFC8D8':'#FF9AB5'} opacity="0.65" transform={`rotate(${rot} 110 110)`}/>
        ))}
        <circle cx="110" cy="110" r="18" fill="#FF7BAA" opacity="0.85"/>
        <circle cx="110" cy="110" r="9" fill="#FFD0E0" opacity="0.95"/>
        {[0,60,120,180,240,300].map((rot,i)=>(
          <ellipse key={i} cx="55" cy="220" rx="24" ry="10" fill="#FFCCD8" opacity="0.55" transform={`rotate(${rot} 55 220)`}/>
        ))}
        <circle cx="55" cy="220" r="9" fill="#FF9AB5" opacity="0.8"/>
        <ellipse cx="80" cy="170" rx="28" ry="9" fill="#A8E6C0" opacity="0.5" transform="rotate(-35 80 170)"/>
        <ellipse cx="140" cy="190" rx="22" ry="8" fill="#B8EEC8" opacity="0.45" transform="rotate(25 140 190)"/>
        {[[200,50,7],[240,90,4],[180,130,5],[220,160,3],[260,40,5]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#FFB7CE" opacity="0.4"/>
        ))}
      </svg>
      <svg viewBox="0 0 300 300" style={{position:'absolute',top:-10,right:-10,width:320,height:320,opacity:0.6,pointerEvents:'none',transform:'scaleX(-1)'}} xmlns="http://www.w3.org/2000/svg">
        {[0,35,70,105,140,175,210,245,280,315].map((rot,i)=>(
          <ellipse key={i} cx="110" cy="110" rx="52" ry="22" fill={i%3===0?'#FFB7CE':i%3===1?'#FFC8D8':'#FF9AB5'} opacity="0.65" transform={`rotate(${rot} 110 110)`}/>
        ))}
        <circle cx="110" cy="110" r="18" fill="#FF7BAA" opacity="0.85"/>
        <circle cx="110" cy="110" r="9" fill="#FFD0E0" opacity="0.95"/>
        {[0,60,120,180,240,300].map((rot,i)=>(
          <ellipse key={i} cx="55" cy="220" rx="24" ry="10" fill="#FFCCD8" opacity="0.55" transform={`rotate(${rot} 55 220)`}/>
        ))}
        <circle cx="55" cy="220" r="9" fill="#FF9AB5" opacity="0.8"/>
        {[[200,50,7],[240,90,4],[180,130,5],[220,160,3],[260,40,5]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#FFB7CE" opacity="0.4"/>
        ))}
      </svg>
      <svg viewBox="0 0 200 200" style={{position:'absolute',bottom:-15,left:20,width:200,height:200,opacity:0.5,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        {[0,72,144,216,288].map((rot,i)=>(
          <ellipse key={i} cx="80" cy="130" rx="40" ry="13" fill={i%2===0?'#FFB0C8':'#FFC8D8'} opacity="0.65" transform={`rotate(${rot} 80 130)`}/>
        ))}
        <circle cx="80" cy="130" r="10" fill="#FF8BAA" opacity="0.85"/>
      </svg>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:10,background:'repeating-linear-gradient(90deg,#FFB7CE 0px,#FFB7CE 16px,#FF8BAA 16px,#FF8BAA 24px,#FFC8D8 24px,#FFC8D8 40px,#FFAAC0 40px,#FFAAC0 48px)',opacity:0.8}}/>
    </>
  )
}

function AdminDecorations() {
  const dots = []
  for (let r=0;r<10;r++) for (let c=0;c<10;c++) dots.push([c*18+8,r*18+8])
  const hexCenters = [[55,55],[100,35],[145,65],[75,110],[120,90],[165,45],[45,145],[90,165],[135,125],[175,100]]
  const hexPts = (cx,cy,r=32) => Array.from({length:6},(_,k)=>{const a=Math.PI/180*(60*k-30);return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`}).join(' ')
  return (
    <>
      <svg viewBox="0 0 190 190" style={{position:'absolute',top:0,left:0,width:220,height:220,opacity:0.4,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        {dots.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.8" fill="#6B8FE8" opacity={0.2+((i*13)%7)*0.07}/>)}
      </svg>
      <svg viewBox="0 0 190 190" style={{position:'absolute',top:0,right:0,width:220,height:220,opacity:0.4,pointerEvents:'none',transform:'scaleX(-1)'}} xmlns="http://www.w3.org/2000/svg">
        {dots.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.8" fill="#9B77E0" opacity={0.2+((i*11)%7)*0.07}/>)}
      </svg>
      <svg viewBox="0 0 220 380" style={{position:'absolute',top:'8%',left:0,width:240,height:380,opacity:0.32,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        {hexCenters.map(([cx,cy],i)=>(
          <polygon key={i} points={hexPts(cx,cy)} fill={i%3===0?'#EEF2FF20':'none'} stroke={i%2===0?'#6B8FE8':'#9B77E0'} strokeWidth="1.5" opacity="0.8"/>
        ))}
        {hexCenters.slice(0,-1).map(([cx,cy],i)=>(
          <line key={i} x1={cx} y1={cy} x2={hexCenters[i+1][0]} y2={hexCenters[i+1][1]} stroke="#6B8FE8" strokeWidth="1" opacity="0.4" strokeDasharray="4 4"/>
        ))}
        {hexCenters.map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="4" fill={i%2===0?'#6B8FE8':'#9B77E0'} opacity="0.7"/>)}
      </svg>
      <svg viewBox="0 0 220 380" style={{position:'absolute',top:'8%',right:0,width:240,height:380,opacity:0.32,pointerEvents:'none',transform:'scaleX(-1)'}} xmlns="http://www.w3.org/2000/svg">
        {hexCenters.map(([cx,cy],i)=>(
          <polygon key={i} points={hexPts(cx,cy)} fill="none" stroke={i%2===0?'#9B77E0':'#6B8FE8'} strokeWidth="1.5" opacity="0.8"/>
        ))}
        {hexCenters.slice(0,-1).map(([cx,cy],i)=>(
          <line key={i} x1={cx} y1={cy} x2={hexCenters[i+1][0]} y2={hexCenters[i+1][1]} stroke="#9B77E0" strokeWidth="1" opacity="0.4" strokeDasharray="4 4"/>
        ))}
        {hexCenters.map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="4" fill={i%2===0?'#9B77E0':'#6B8FE8'} opacity="0.7"/>)}
      </svg>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:6,background:'linear-gradient(90deg,#6B8FE8,#9B77E0,#6B8FE8)',opacity:0.7}}/>
    </>
  )
}

function EcommerceDecorations() {
  return (
    <>
      <svg viewBox="0 0 320 320" style={{position:'absolute',top:-10,left:-10,width:340,height:340,opacity:0.45,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        <path d="M-15,80 C30,20 90,90 70,150 C50,210 110,230 90,290 C70,350 20,320 -15,290" fill="none" stroke="#E06835" strokeWidth="3" opacity="0.55"/>
        <path d="M15,50 C70,0 130,80 110,140 C90,200 150,220 130,280" fill="none" stroke="#F0A050" strokeWidth="2" opacity="0.45"/>
        <path d="M-30,0 C20,-15 70,35 50,95 C30,155 80,175 60,235 C40,295 -20,275 -35,215 C-50,155 -70,60 -30,0Z" fill="#F0A050" opacity="0.14"/>
        {[[170,30,7],[200,60,5],[185,90,6],[215,110,4],[240,45,5],[260,75,4],[230,100,5],[255,130,3]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#E06835" opacity={0.22+i*0.03}/>
        ))}
      </svg>
      <svg viewBox="0 0 320 320" style={{position:'absolute',top:-10,right:-10,width:340,height:340,opacity:0.45,pointerEvents:'none',transform:'scaleX(-1)'}} xmlns="http://www.w3.org/2000/svg">
        <path d="M-15,80 C30,20 90,90 70,150 C50,210 110,230 90,290 C70,350 20,320 -15,290" fill="none" stroke="#E06835" strokeWidth="3" opacity="0.55"/>
        <path d="M15,50 C70,0 130,80 110,140 C90,200 150,220 130,280" fill="none" stroke="#F0A050" strokeWidth="2" opacity="0.45"/>
        <path d="M-30,0 C20,-15 70,35 50,95 C30,155 80,175 60,235 C40,295 -20,275 -35,215 C-50,155 -70,60 -30,0Z" fill="#F0A050" opacity="0.14"/>
        {[[170,30,7],[200,60,5],[185,90,6],[215,110,4],[240,45,5],[260,75,4],[230,100,5],[255,130,3]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#E06835" opacity={0.22+i*0.03}/>
        ))}
      </svg>
      <svg viewBox="0 0 240 220" style={{position:'absolute',bottom:-20,right:0,width:260,height:240,opacity:0.38,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
        <path d="M240,220 C180,175 210,110 175,65 C140,20 95,45 70,90 C45,135 65,185 110,205 C155,225 210,245 240,220Z" fill="#F0A050" opacity="0.32"/>
        <path d="M240,210 C185,170 215,105 180,60 C145,15 100,40 75,85 C50,130 70,178 115,198" fill="none" stroke="#E06835" strokeWidth="2.5" opacity="0.45"/>
      </svg>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:7,background:'linear-gradient(90deg,#E06835,#F0A050,#E06835)',opacity:0.85}}/>
    </>
  )
}

function LoadingScreen() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#FDFCFB'}}>
      <div style={{width:42,height:42,borderRadius:'50%',border:'3.5px solid #F0E8E8',borderTopColor:'#E8527A',animation:'spin 0.7s linear infinite',marginBottom:18}}/>
      <p style={{fontSize:11,color:'#CCC',fontWeight:800,letterSpacing:3,textTransform:'uppercase'}}>Loading Portfolio</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function App() {
  const [profile, setProfile]     = useState(null)
  const [niches, setNiches]       = useState([])
  const [projects, setProjects]   = useState({})
  const [certs, setCerts]         = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const portfolioRef = useRef(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, nicheData, projData, certData] = await Promise.all([
          fetchProfile(), fetchNiches(), fetchAllProjects(), fetchAllCertificates(),
        ])
        setProfile(profData)
        const parsedNiches = (nicheData || []).map(n => ({
          ...n,
          theme: { ...parseTheme(n.theme), ...(NICHE_THEMES[n.slug] || {}) },
          skills: parseSkills(n.skills),
        }))
        setNiches(parsedNiches)
        const grouped = (projData || []).reduce((acc,p) => {
          const slug = p.niche_slug || 'other'
          if (!acc[slug]) acc[slug] = []
          acc[slug].push(p)
          return acc
        }, {})
        setProjects(grouped)
        setCerts(certData || [])
        if (parsedNiches.length > 0) setActiveTab(parsedNiches[0].slug)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingScreen />
  if (error)   return <div style={{padding:40}}>Error: {error}</div>

  const activeNiche = niches.find(n => n.slug === activeTab)
  const t           = activeNiche?.theme || {}
  const accent      = t.accent    || '#E8527A'
  const accentAlt   = t.accentAlt || accent
  const bgGrad      = t.grad      || '#FDFCFB'
  const gradHero    = t.gradHero  || `linear-gradient(135deg,${accent},${accentAlt})`

  return (
    <div style={{background:'#FDFCFB',minHeight:'100vh'}}>
      <style>{`
        @keyframes fadeUp   {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heroIn   {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modalPop {from{opacity:0;transform:scale(0.93) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes ribbonMove{from{background-position:0% 50%}to{background-position:200% 50%}}
        .tab-pill{transition:all 0.28s cubic-bezier(0.34,1.4,0.64,1)!important}
        .tab-pill:hover{transform:translateY(-3px) scale(1.05)!important}
        .proj-card{transition:all 0.22s ease!important}
        .proj-card:hover{transform:translateY(-6px)!important}
        .cert-card{transition:all 0.2s ease!important}
        .cert-card:hover{transform:translateY(-3px)!important}
      `}</style>

      {/* ── HERO ── */}
      <header style={{
        padding:'96px 40px 64px', textAlign:'center',
        background:bgGrad, transition:'background 0.5s ease',
        animation:'heroIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
        position:'relative', overflow:'hidden', minHeight:340,
      }}>
        {activeTab === 'creative'  && <CreativeDecorations />}
        {activeTab === 'admin'     && <AdminDecorations />}
        {activeTab === 'ecommerce' && <EcommerceDecorations />}

        <div style={{position:'relative',zIndex:2}}>
          {/* Availability badge */}
          <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:20,flexWrap:'wrap'}}>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:7,
              padding:'5px 16px',borderRadius:50,
              background:`linear-gradient(90deg,${accent}22,${accentAlt}22)`,
              border:`1.5px solid ${accent}44`,transition:'all 0.5s ease',
            }}>
              <div style={{width:6,height:6,borderRadius:'50%',background:gradHero}}/>
              <span style={{fontSize:11,fontWeight:900,color:t.accentDark||accent,letterSpacing:1.5,textTransform:'uppercase'}}>
                Portfolio · 2025
              </span>
            </div>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:6,
              padding:'5px 14px',borderRadius:50,
              background:'rgba(34,197,94,0.12)',
              border:'1.5px solid rgba(34,197,94,0.3)',
            }}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 6px #22C55E88'}}/>
              <span style={{fontSize:11,fontWeight:900,color:'#15803D',letterSpacing:1}}>
                Open for Part-time Work
              </span>
            </div>
          </div>

          <h1 style={{fontSize:52,fontWeight:900,letterSpacing:-2,lineHeight:1.05,marginBottom:10,color:'#111'}}>
            {profile?.name || 'Portfolio'}
          </h1>

          {/* Gradient subtitle */}
          <p style={{
            fontSize:16,fontWeight:700,marginBottom:8,letterSpacing:0.3,
            background:gradHero,
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            transition:'all 0.5s ease',
          }}>
            {profile?.title}
          </p>

          {/* Tagline */}
          <p style={{fontSize:13,color:'#AAA',fontWeight:600,marginBottom:20,letterSpacing:0.5}}>
            Multi-skilled Freelancer · Part-time Available · Project-based Rates
          </p>

          <p style={{color:'#777',maxWidth:520,margin:'0 auto 24px',lineHeight:1.9,fontSize:14}}>
            {profile?.bio}
          </p>

          {/* Quick stats row */}
          <div style={{display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap'}}>
            {[
              { n:'3', label:'Skill Niches' },
              { n:'2', label:'Live Apps' },
              { n:'12+', label:'Certifications' },
              { n:'30+', label:'Design Projects' },
              { n:'60h', label:'Gov. Immersion' },
            ].map(({n,label}) => (
              <div key={label} style={{textAlign:'center'}}>
                <p style={{
                  margin:0, fontSize:22, fontWeight:900, lineHeight:1,
                  background:gradHero,
                  WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                }}>{n}</p>
                <p style={{margin:'3px 0 0',fontSize:10,color:'#BBB',fontWeight:700,letterSpacing:0.5,textTransform:'uppercase'}}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Animated stripe divider */}
      <div style={{
        height:12, backgroundSize:'200% 100%',
        background: t.stripeBg || `linear-gradient(90deg,${accent},${accentAlt},${accent})`,
        animation:'ribbonMove 4s linear infinite', opacity:0.85,
        transition:'background 0.5s ease',
      }}/>

      {/* ── TAB NAV ── */}
      <nav style={{display:'flex',justifyContent:'center',gap:10,padding:'30px 20px 48px',flexWrap:'wrap'}}>
        {niches.map(n => {
          const isActive = activeTab === n.slug
          const nt = n.theme || {}
          return (
            <button key={n.id} className="tab-pill" onClick={()=>setActiveTab(n.slug)}
              style={{
                padding:'12px 26px', borderRadius:50, border:'none', cursor:'pointer',
                background: isActive
                  ? `linear-gradient(135deg,${nt.accent||'#888'},${nt.accentAlt||nt.accent||'#888'})`
                  : '#EEEEED',
                color: isActive ? '#fff' : '#888',
                fontWeight:800, fontSize:13, letterSpacing:0.3,
                boxShadow: isActive ? `0 6px 22px ${nt.accent||'#888'}44` : 'none',
              }}
            >
              {n.icon && <span style={{marginRight:7,fontSize:15}}>{n.icon}</span>}
              {n.name}
            </button>
          )
        })}
      </nav>

      {/* ── MAIN ── */}
      <main ref={portfolioRef} style={{maxWidth:1100,margin:'0 auto',padding:'0 32px 100px'}}>
        {activeTab && (
          <NichePanel
            key={activeTab}
            niche={niches.find(n => n.slug === activeTab)}
            projects={projects[activeTab] || []}
            certificates={certs.filter(c => c.niche === activeTab)}
          />
        )}
      </main>

      <ContactSection profile={profile} theme={t} />

      <footer style={{background:'#111',padding:'42px 40px',color:'#fff',textAlign:'center'}}>
        <div style={{width:38,height:4,borderRadius:2,margin:'0 auto 18px',background:gradHero,transition:'background 0.5s ease'}}/>
        <p style={{fontSize:12,color:'#555',letterSpacing:0.5}}>
          © {new Date().getFullYear()} {profile?.name} &nbsp;·&nbsp; Multi-skilled Freelancer · Open for Part-time Work ✦
        </p>
      </footer>
    </div>
  )
}