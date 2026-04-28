import { useState, useEffect, useRef } from 'react'
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { fetchProfile, fetchNiches, fetchAllProjects, fetchAllCertificates } from './lib/supabase'

const NICHE_THEMES = {
  creative: {
    accent: '#E8527A', accentAlt: '#F0884A', accentDark: '#9B1F3A',
    accentLight: '#FFF0F3', tag: '#C0436A', tagBg: '#FFE4EE',
    border: '#F8C0CC', grad: 'linear-gradient(160deg,#FFF0EC 0%,#FFE4F0 45%,#FFF5E8 100%)',
    gradHero: 'linear-gradient(135deg,#FF9A8B,#E8527A,#F0884A)',
    cardGlass: 'rgba(255,255,255,0.72)', cardBorder: '#F9C8D4',
    certBg: 'rgba(255,245,250,0.88)', certBorder: '#F8B8CC',
    bannerBg: 'linear-gradient(135deg,#FFF0EC,#FFE4F0,#FFF8F4)',
    stripeBg: 'linear-gradient(90deg,#FF9A8B,#E8527A,#F472B6,#F0884A,#FF9A8B)',
    stripeText: '#fff',
  },
  admin: {
    accent: '#6B8FE8', accentAlt: '#9B77E0', accentDark: '#1E3A8A',
    accentLight: '#EEF2FF', tag: '#3B5FBF', tagBg: '#E0E8FF',
    border: '#C5D0F8', grad: 'linear-gradient(160deg,#EEF2FF 0%,#F0EEFF 50%,#F5F8FF 100%)',
    gradHero: 'linear-gradient(135deg,#6B8FE8,#9B77E0)',
    cardGlass: 'rgba(255,255,255,0.68)', cardBorder: '#D0DAFF',
    certBg: 'rgba(240,244,255,0.88)', certBorder: '#C5D0F8',
    bannerBg: 'linear-gradient(135deg,#EEF2FF,#F0EEFF,#F5F8FF)',
    stripeBg: 'linear-gradient(90deg,#6B8FE8,#9B77E0,#6B8FE8)',
    stripeText: '#fff',
  },
  ecommerce: {
    accent: '#E06835', accentAlt: '#F0A050', accentDark: '#7A2E10',
    accentLight: '#FFF4EE', tag: '#9B3510', tagBg: '#FFE8D8',
    border: '#FFCAAA', grad: 'linear-gradient(160deg,#FFF4EE 0%,#FFF0E8 50%,#FFF8F4 100%)',
    gradHero: 'linear-gradient(135deg,#E06835,#F0A050)',
    cardGlass: 'rgba(255,255,255,0.72)', cardBorder: '#FFD5B8',
    certBg: 'rgba(255,249,244,0.88)', certBorder: '#FFCFAA',
    bannerBg: 'linear-gradient(135deg,#FFF4EE,#FFF0E8,#FFF8F4)',
    stripeBg: 'linear-gradient(90deg,#E06835,#F0A050,#E06835)',
    stripeText: '#fff',
  },
}

// ── Decorative SVG backgrounds per niche ─────────────────────────────────────

function CreativeDecorations() {
  return (
    <>
      {/* Top-left floral cluster */}
      <svg viewBox="0 0 260 260" style={{ position:'absolute',top:0,left:0,width:260,height:260,opacity:0.55,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        {/* Large peony bloom */}
        {[0,40,80,120,160,200,240,280,320].map((rot,i) => (
          <ellipse key={i} cx="90" cy="90" rx="38" ry="18" fill={i%2===0?'#FFB7CE':'#FFC8D8'} opacity="0.7" transform={`rotate(${rot} 90 90)`}/>
        ))}
        <circle cx="90" cy="90" r="14" fill="#FF8BAA" opacity="0.8"/>
        <circle cx="90" cy="90" r="7" fill="#FFD0DC" opacity="0.9"/>
        {/* Small bloom */}
        {[0,60,120,180,240,300].map((rot,i) => (
          <ellipse key={i} cx="48" cy="180" rx="18" ry="9" fill="#FFCCD8" opacity="0.6" transform={`rotate(${rot} 48 180)`}/>
        ))}
        <circle cx="48" cy="180" r="7" fill="#FF9AB5" opacity="0.8"/>
        {/* Lily petals bottom-left */}
        {[0,72,144,216,288].map((rot,i) => (
          <ellipse key={i} cx="30" cy="230" rx="22" ry="8" fill="#FFB0C8" opacity="0.5" transform={`rotate(${rot} 30 230)`}/>
        ))}
        {/* Floating dots */}
        {[[150,40,5],[200,70,3],[170,110,4],[120,150,3],[220,130,4]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#FFB7CE" opacity="0.5"/>
        ))}
        {/* Leaves */}
        <ellipse cx="65" cy="140" rx="20" ry="8" fill="#C8F0D8" opacity="0.45" transform="rotate(-30 65 140)"/>
        <ellipse cx="110" cy="160" rx="18" ry="7" fill="#B8E8C8" opacity="0.4" transform="rotate(20 110 160)"/>
      </svg>

      {/* Top-right mirror floral */}
      <svg viewBox="0 0 260 260" style={{ position:'absolute',top:0,right:0,width:260,height:260,opacity:0.55,pointerEvents:'none',transform:'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        {[0,40,80,120,160,200,240,280,320].map((rot,i) => (
          <ellipse key={i} cx="90" cy="90" rx="38" ry="18" fill={i%2===0?'#FFB7CE':'#FFC8D8'} opacity="0.7" transform={`rotate(${rot} 90 90)`}/>
        ))}
        <circle cx="90" cy="90" r="14" fill="#FF8BAA" opacity="0.8"/>
        <circle cx="90" cy="90" r="7" fill="#FFD0DC" opacity="0.9"/>
        {[0,60,120,180,240,300].map((rot,i) => (
          <ellipse key={i} cx="48" cy="180" rx="18" ry="9" fill="#FFCCD8" opacity="0.6" transform={`rotate(${rot} 48 180)`}/>
        ))}
        <circle cx="48" cy="180" r="7" fill="#FF9AB5" opacity="0.8"/>
        {[[150,40,5],[200,70,3],[170,110,4],[120,150,3],[220,130,4]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#FFB7CE" opacity="0.5"/>
        ))}
        <ellipse cx="65" cy="140" rx="20" ry="8" fill="#C8F0D8" opacity="0.45" transform="rotate(-30 65 140)"/>
      </svg>

      {/* Bottom-left lily */}
      <svg viewBox="0 0 200 200" style={{ position:'absolute',bottom:-20,left:0,width:200,height:200,opacity:0.45,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        {[0,72,144,216,288].map((rot,i) => (
          <ellipse key={i} cx="70" cy="140" rx="32" ry="11" fill={i%2===0?'#FFB0C8':'#FFC8D8'} opacity="0.65" transform={`rotate(${rot} 70 140)`}/>
        ))}
        <circle cx="70" cy="140" r="9" fill="#FF8BAA" opacity="0.8"/>
        {/* Stamens */}
        {[0,60,120,180,240,300].map((rot,i)=>(
          <line key={i} x1="70" y1="140" x2="70" y2="118" stroke="#FFB7CE" strokeWidth="1.5" opacity="0.7" transform={`rotate(${rot} 70 140)`}/>
        ))}
      </svg>

      {/* Right side wave ribbon */}
      <svg viewBox="0 0 80 400" style={{ position:'absolute',right:0,top:'30%',width:80,height:300,opacity:0.35,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M80,0 Q20,50 80,100 Q20,150 80,200 Q20,250 80,300 Q20,350 80,400" fill="none" stroke="#FF9AB5" strokeWidth="3" opacity="0.6"/>
        <path d="M80,20 Q30,70 80,120 Q30,170 80,220 Q30,270 80,320" fill="none" stroke="#FFCCD8" strokeWidth="2" opacity="0.5"/>
      </svg>

      {/* Ribbon divider strip with bow pattern */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:12,
        background:'repeating-linear-gradient(90deg, #FFB7CE 0px, #FFB7CE 18px, #FF8BAA 18px, #FF8BAA 26px, #FFC8D8 26px, #FFC8D8 44px, #FFAAC0 44px, #FFAAC0 52px)',
        opacity:0.7,
      }}/>
    </>
  )
}

function AdminDecorations() {
  const dots = []
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) dots.push([c*18+10, r*18+10])
  const hexes = [[50,60],[90,40],[130,70],[70,110],[110,90],[150,50],[40,130],[80,150]]

  return (
    <>
      {/* Top-left dot matrix */}
      <svg viewBox="0 0 160 160" style={{ position:'absolute',top:0,left:0,width:200,height:200,opacity:0.35,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        {dots.map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#6B8FE8" opacity={0.3+((i*0.04)%0.5)}/>
        ))}
      </svg>

      {/* Top-right dot matrix */}
      <svg viewBox="0 0 160 160" style={{ position:'absolute',top:0,right:0,width:200,height:200,opacity:0.35,pointerEvents:'none',transform:'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        {dots.map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#9B77E0" opacity={0.3+((i*0.04)%0.5)}/>
        ))}
      </svg>

      {/* Left hex grid */}
      <svg viewBox="0 0 200 400" style={{ position:'absolute',top:'5%',left:0,width:220,height:420,opacity:0.28,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        {hexes.map(([cx,cy],i)=>{
          const r=28, pts=Array.from({length:6},(_,k)=>{
            const a=Math.PI/180*(60*k-30)
            return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`
          }).join(' ')
          return <polygon key={i} points={pts} fill="none" stroke={i%2===0?'#6B8FE8':'#9B77E0'} strokeWidth="1.5" opacity="0.7"/>
        })}
        {/* Connection lines */}
        <line x1="50" y1="60" x2="90" y2="40" stroke="#6B8FE8" strokeWidth="1" opacity="0.4"/>
        <line x1="90" y1="40" x2="130" y2="70" stroke="#6B8FE8" strokeWidth="1" opacity="0.4"/>
        <line x1="70" y1="110" x2="110" y2="90" stroke="#9B77E0" strokeWidth="1" opacity="0.4"/>
        <line x1="110" y1="90" x2="150" y2="50" stroke="#9B77E0" strokeWidth="1" opacity="0.4"/>
        {/* Node dots */}
        {hexes.map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={i%2===0?'#6B8FE8':'#9B77E0'} opacity="0.6"/>
        ))}
      </svg>

      {/* Right hex grid mirror */}
      <svg viewBox="0 0 200 400" style={{ position:'absolute',top:'5%',right:0,width:220,height:420,opacity:0.28,pointerEvents:'none',transform:'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        {hexes.map(([cx,cy],i)=>{
          const r=28, pts=Array.from({length:6},(_,k)=>{
            const a=Math.PI/180*(60*k-30)
            return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`
          }).join(' ')
          return <polygon key={i} points={pts} fill="none" stroke={i%2===0?'#9B77E0':'#6B8FE8'} strokeWidth="1.5" opacity="0.7"/>
        })}
        <line x1="50" y1="60" x2="90" y2="40" stroke="#6B8FE8" strokeWidth="1" opacity="0.4"/>
        <line x1="90" y1="40" x2="130" y2="70" stroke="#6B8FE8" strokeWidth="1" opacity="0.4"/>
        <line x1="70" y1="110" x2="110" y2="90" stroke="#9B77E0" strokeWidth="1" opacity="0.4"/>
        {hexes.map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={i%2===0?'#9B77E0':'#6B8FE8'} opacity="0.6"/>
        ))}
      </svg>

      {/* Bottom gradient bar */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:6,
        background:'linear-gradient(90deg,#6B8FE8,#9B77E0,#6B8FE8)',
        opacity:0.7,
      }}/>
    </>
  )
}

function EcommerceDecorations() {
  return (
    <>
      {/* Top-left organic wave art */}
      <svg viewBox="0 0 280 280" style={{ position:'absolute',top:0,left:0,width:300,height:300,opacity:0.4,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M-10,60 C30,20 80,80 60,130 C40,180 100,200 80,250 C60,300 20,280 -10,260" fill="none" stroke="#E06835" strokeWidth="2.5" opacity="0.5"/>
        <path d="M10,40 C60,0 110,70 90,120 C70,170 130,190 110,240" fill="none" stroke="#F0A050" strokeWidth="2" opacity="0.4"/>
        <path d="M40,10 C90,30 70,90 110,110 C150,130 140,180 170,200" fill="none" stroke="#E06835" strokeWidth="1.5" opacity="0.35"/>
        {/* Filled organic blob */}
        <path d="M-20,0 C20,-10 60,30 40,80 C20,130 70,150 50,200 C30,250 -20,240 -30,180 C-40,120 -60,50 -20,0Z" fill="#F0A050" opacity="0.12"/>
        {/* Halftone dots cluster */}
        {[
          [160,30,6],[190,55,4],[175,80,5],[200,100,3],
          [220,40,4],[240,65,3],[210,85,4],[235,110,3],
        ].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#E06835" opacity={0.25+i*0.04}/>
        ))}
      </svg>

      {/* Top-right organic wave mirror */}
      <svg viewBox="0 0 280 280" style={{ position:'absolute',top:0,right:0,width:300,height:300,opacity:0.4,pointerEvents:'none',transform:'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M-10,60 C30,20 80,80 60,130 C40,180 100,200 80,250 C60,300 20,280 -10,260" fill="none" stroke="#E06835" strokeWidth="2.5" opacity="0.5"/>
        <path d="M10,40 C60,0 110,70 90,120 C70,170 130,190 110,240" fill="none" stroke="#F0A050" strokeWidth="2" opacity="0.4"/>
        <path d="M40,10 C90,30 70,90 110,110 C150,130 140,180 170,200" fill="none" stroke="#E06835" strokeWidth="1.5" opacity="0.35"/>
        <path d="M-20,0 C20,-10 60,30 40,80 C20,130 70,150 50,200 C30,250 -20,240 -30,180 C-40,120 -60,50 -20,0Z" fill="#F0A050" opacity="0.12"/>
        {[[160,30,6],[190,55,4],[175,80,5],[200,100,3],[220,40,4],[240,65,3],[210,85,4],[235,110,3]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#E06835" opacity={0.25+i*0.04}/>
        ))}
      </svg>

      {/* Bottom-right warm blob */}
      <svg viewBox="0 0 200 200" style={{ position:'absolute',bottom:-30,right:0,width:220,height:220,opacity:0.35,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M200,200 C150,160 180,100 150,60 C120,20 80,40 60,80 C40,120 60,170 100,190 C140,210 190,220 200,200Z" fill="#F0A050" opacity="0.3"/>
        <path d="M200,200 C160,170 190,110 160,70 C130,30 90,50 70,90 C50,130 70,180 110,195" fill="none" stroke="#E06835" strokeWidth="2" opacity="0.4"/>
      </svg>

      {/* Bottom gradient bar */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:6,
        background:'linear-gradient(90deg,#E06835,#F0A050,#E06835)',
        opacity:0.8,
      }}/>
    </>
  )
}

// ── Ribbon divider (Creative only) ───────────────────────────────────────────
function RibbonDivider({ theme }) {
  if (!theme?.stripeBg) return null
  return (
    <div style={{
      height: 14,
      background: theme.stripeBg,
      backgroundSize: '200% 100%',
      animation: 'ribbonMove 3s linear infinite',
      opacity: 0.85,
    }}/>
  )
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

function LoadingScreen() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FDFCFB' }}>
      <div style={{ width:40,height:40,borderRadius:'50%',border:'3px solid #F0E8E8',borderTopColor:'#E8527A',animation:'spin 0.75s linear infinite',marginBottom:18 }}/>
      <p style={{ fontSize:11,color:'#CCC',fontWeight:800,letterSpacing:3,textTransform:'uppercase' }}>Loading Portfolio</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
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
        const grouped = (projData || []).reduce((acc, p) => {
          const slug = p.niche_slug || 'other'
          if (!acc[slug]) acc[slug] = []
          acc[slug].push(p)
          return acc
        }, {})
        setProjects(grouped)
        setCerts(certData || [])
        if (parsedNiches.length > 0) setActiveTab(parsedNiches[0].slug)
      } catch (err) {
        console.error('Fetch Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingScreen />
  if (error)   return <div style={{ padding:40 }}>Error: {error}</div>

  const activeNiche = niches.find(n => n.slug === activeTab)
  const t           = activeNiche?.theme || {}
  const accent      = t.accent    || '#E8527A'
  const accentAlt   = t.accentAlt || accent
  const bgGrad      = t.grad      || '#FDFCFB'
  const gradHero    = t.gradHero  || `linear-gradient(135deg,${accent},${accentAlt})`

  return (
    <div style={{ background:'#FDFCFB', minHeight:'100vh' }}>
      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes heroIn    { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes modalPop  { from { opacity:0; transform:scale(0.93) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes ribbonMove{ from { background-position:0% 50% } to { background-position:200% 50% } }
        @keyframes floatPetal{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(8deg)} }
        .tab-pill { transition: all 0.28s cubic-bezier(0.34,1.4,0.64,1) !important; }
        .tab-pill:hover { transform: translateY(-3px) scale(1.04) !important; }
        .proj-card { transition: all 0.24s ease !important; }
        .proj-card:hover { transform: translateY(-5px) !important; }
      `}</style>

      {/* ── HERO ── */}
      <header style={{
        padding: '90px 40px 56px', textAlign:'center',
        background: bgGrad,
        transition: 'background 0.5s ease',
        animation: 'heroIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
        position:'relative', overflow:'hidden', minHeight: 320,
      }}>
        {/* Per-niche decorations */}
        {activeTab === 'creative'  && <CreativeDecorations />}
        {activeTab === 'admin'     && <AdminDecorations />}
        {activeTab === 'ecommerce' && <EcommerceDecorations />}

        {/* Content (above decorations) */}
        <div style={{ position:'relative', zIndex:2 }}>
          {/* Pill badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 16px', borderRadius:50,
            background:`linear-gradient(90deg, ${accent}22, ${accentAlt}22)`,
            border:`1px solid ${accent}44`, marginBottom:22,
            transition:'all 0.5s ease',
          }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:gradHero }}/>
            <span style={{ fontSize:11,fontWeight:800,color:t.accentDark||accent,letterSpacing:1.5,textTransform:'uppercase' }}>
              Portfolio
            </span>
          </div>

          <h1 style={{ fontSize:50,fontWeight:900,letterSpacing:-2,lineHeight:1.05,marginBottom:12,color:'#111' }}>
            {profile?.name || 'Portfolio'}
          </h1>
          <p style={{
            fontSize:15,fontWeight:700,marginBottom:20,letterSpacing:0.3,
            background:gradHero,
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            transition:'all 0.5s ease',
          }}>
            {profile?.title}
          </p>
          <p style={{ color:'#777',maxWidth:520,margin:'0 auto',lineHeight:1.85,fontSize:14 }}>
            {profile?.bio}
          </p>
        </div>
      </header>

      {/* Ribbon/stripe divider — per theme */}
      <RibbonDivider theme={t} />

      {/* ── TAB NAV ── */}
      <nav style={{
        display:'flex', justifyContent:'center', gap:10,
        padding:'28px 20px 44px', flexWrap:'wrap',
      }}>
        {niches.map(n => {
          const isActive = activeTab === n.slug
          const nt = n.theme || {}
          return (
            <button key={n.id} className="tab-pill" onClick={() => setActiveTab(n.slug)}
              style={{
                padding:'11px 24px', borderRadius:50, border:'none', cursor:'pointer',
                background: isActive
                  ? `linear-gradient(135deg, ${nt.accent||'#888'}, ${nt.accentAlt||nt.accent||'#888'})`
                  : '#F0EFED',
                color: isActive ? '#FFF' : '#888',
                fontWeight:800, fontSize:13, letterSpacing:0.3,
                boxShadow: isActive ? `0 6px 20px ${nt.accent||'#888'}44` : 'none',
              }}
            >
              {n.icon && <span style={{ marginRight:7, fontSize:14 }}>{n.icon}</span>}
              {n.name}
            </button>
          )
        })}
      </nav>

      {/* ── MAIN ── */}
      <main ref={portfolioRef} style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 100px' }}>
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

      <footer style={{ background:'#111', padding:'40px', color:'#fff', textAlign:'center' }}>
        <div style={{
          width:36,height:3,borderRadius:2,margin:'0 auto 18px',
          background:gradHero, transition:'background 0.5s ease',
        }}/>
        <p style={{ fontSize:12, color:'#666', letterSpacing:0.5 }}>
          © {new Date().getFullYear()} {profile?.name} &nbsp;·&nbsp; Built with care ✦
        </p>
      </footer>
    </div>
  )
}
