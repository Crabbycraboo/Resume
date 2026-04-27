import { useState, useEffect, useRef } from 'react'
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { fetchProfile, fetchNiches, fetchAllProjects, fetchAllCertificates } from './lib/supabase'

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAF9' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #EEE', borderTopColor: '#D4607A', animation: 'spin 0.7s linear infinite', marginBottom: 16 }} />
      <p style={{ fontSize: 13, color: '#AAA', fontWeight: 600, letterSpacing: 1 }}>LOADING PORTFOLIO</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  const [profile, setProfile] = useState(null)
  const [niches, setNiches] = useState([])
  const [projects, setProjects] = useState({})
  const [certs, setCerts] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const portfolioRef = useRef(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, nicheData, projData, certData] = await Promise.all([
          fetchProfile(),
          fetchNiches(),
          fetchAllProjects(),
          fetchAllCertificates(),
        ])
        setProfile(profData)
        setNiches(nicheData || [])
        const grouped = (projData || []).reduce((acc, p) => {
          const slug = p.niche_slug || 'other'
          if (!acc[slug]) acc[slug] = []
          acc[slug].push(p)
          return acc
        }, {})
        setProjects(grouped)
        setCerts(certData || [])
        if (nicheData?.length > 0) setActiveTab(nicheData[0].slug)
      } catch (err) {
        console.error("Fetch Error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingScreen />
  if (error) return <div style={{ padding: 40 }}>Error: {error}</div>

  // Get the active niche's theme for page-wide color shifting
  const activeNiche = niches.find(n => n.slug === activeTab)
  const activeTheme = activeNiche?.theme || {}
  const accentColor = activeTheme.accent || '#D4607A'
  const accentLight = activeTheme.accentLight || '#FDE8ED'

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', transition: 'all 0.4s ease' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes heroIn { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
        @keyframes modalPop { from { opacity:0; transform:scale(0.92) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes tabSlide { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:translateX(0) } }
        .tab-btn { transition: all 0.22s ease !important; }
        .tab-btn:hover { transform: translateY(-2px) !important; }
      `}</style>

      {/* HERO HEADER — tinted by active tab */}
      <header style={{
        padding: '80px 40px 50px',
        textAlign: 'center',
        background: `linear-gradient(180deg, ${accentLight}55 0%, transparent 100%)`,
        transition: 'background 0.5s ease',
        animation: 'heroIn 0.6s ease both',
      }}>
        {/* Decorative accent bar */}
        <div style={{
          width: 48, height: 4, borderRadius: 2,
          background: `linear-gradient(90deg, ${accentColor}, ${activeTheme.accentAlt || accentColor}88)`,
          margin: '0 auto 24px',
          transition: 'background 0.5s ease',
        }} />
        <h1 style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1, marginBottom: 10 }}>
          {profile?.name || 'Portfolio'}
        </h1>
        <p style={{ color: accentColor, fontWeight: 700, fontSize: 15, marginBottom: 18, transition: 'color 0.4s ease', letterSpacing: 0.5 }}>
          {profile?.title}
        </p>
        <p style={{ color: '#666', maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontSize: 14 }}>
          {profile?.bio}
        </p>
      </header>

      {/* TAB NAVIGATION */}
      <nav style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        marginBottom: 48, flexWrap: 'wrap', padding: '0 20px',
      }}>
        {niches.map(n => {
          const isActive = activeTab === n.slug
          const nAccent = n.theme?.accent || '#111'
          return (
            <button
              key={n.id}
              className="tab-btn"
              onClick={() => setActiveTab(n.slug)}
              style={{
                padding: '10px 22px', borderRadius: 50, border: 'none', cursor: 'pointer',
                background: isActive ? nAccent : '#EEEEED',
                color: isActive ? '#FFF' : '#777',
                fontWeight: 700, fontSize: 13,
                boxShadow: isActive ? `0 4px 16px ${nAccent}44` : 'none',
                letterSpacing: 0.2,
              }}
            >
              {n.icon && <span style={{ marginRight: 6 }}>{n.icon}</span>}
              {n.name}
            </button>
          )
        })}
      </nav>

      {/* MAIN CONTENT */}
      <main ref={portfolioRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>
        {activeTab && (
          <NichePanel
            key={activeTab}
            niche={niches.find(n => n.slug === activeTab)}
            projects={projects[activeTab] || []}
            certificates={certs.filter(c => c.niche === activeTab)}
          />
        )}
      </main>

      {/* CONTACT */}
      <ContactSection profile={profile} accentColor={accentColor} />

      {/* FOOTER */}
      <footer style={{ background: '#111', padding: '36px 40px', color: '#fff', textAlign: 'center' }}>
        <div style={{ width: 32, height: 3, borderRadius: 2, background: accentColor, margin: '0 auto 16px', transition: 'background 0.4s' }} />
        <p style={{ fontSize: 13, color: '#888' }}>© {new Date().getFullYear()} {profile?.name} · Built with care ✦</p>
      </footer>
    </div>
  )
}