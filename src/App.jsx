import { useState, useEffect, useRef } from 'react'
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { fetchProfile, fetchNiches, fetchAllProjects, fetchAllCertificates } from './lib/supabase'

// ─── THEME OVERRIDES ─────────────────────────────────────────────────────────
// These override whatever is stored in Supabase.
// Creative → Option C (Dreamy Sunset Gradient)
// Admin    → Option A (Cyber-Soft Lavender-Blue)
// Ecommerce→ Option C (Warm Clay/Peach Gradient)
const NICHE_THEMES = {
  creative: {
    accent:       '#E8527A',
    accentAlt:    '#F0884A',
    accentDark:   '#9B1F3A',
    accentLight:  '#FFF0F3',
    tag:          '#C0436A',
    tagBg:        '#FFE4EE',
    border:       '#F8C0CC',
    grad:         'linear-gradient(135deg,#FFF0EC 0%,#FFE4F0 40%,#FFF5E8 100%)',
    gradHero:     'linear-gradient(135deg,#FF9A8B,#E8527A,#F0884A)',
    cardGlass:    'rgba(255,255,255,0.72)',
    cardBorder:   '#F9C8D4',
    certBg:       'rgba(255,245,250,0.88)',
    certBorder:   '#F8B8CC',
    bannerBg:     'linear-gradient(135deg,#FFF0EC,#FFE4F0,#FFF8F4)',
  },
  admin: {
    accent:       '#6B8FE8',
    accentAlt:    '#9B77E0',
    accentDark:   '#1E3A8A',
    accentLight:  '#EEF2FF',
    tag:          '#3B5FBF',
    tagBg:        '#E0E8FF',
    border:       '#C5D0F8',
    grad:         'linear-gradient(135deg,#EEF2FF 0%,#F0EEFF 50%,#F5F8FF 100%)',
    gradHero:     'linear-gradient(135deg,#6B8FE8,#9B77E0)',
    cardGlass:    'rgba(255,255,255,0.68)',
    cardBorder:   '#D0DAFF',
    certBg:       'rgba(240,244,255,0.88)',
    certBorder:   '#C5D0F8',
    bannerBg:     'linear-gradient(135deg,#EEF2FF,#F0EEFF,#F5F8FF)',
  },
  ecommerce: {
    accent:       '#E06835',
    accentAlt:    '#F0A050',
    accentDark:   '#7A2E10',
    accentLight:  '#FFF4EE',
    tag:          '#9B3510',
    tagBg:        '#FFE8D8',
    border:       '#FFCAAA',
    grad:         'linear-gradient(135deg,#FFF4EE 0%,#FFF0E8 50%,#FFF8F4 100%)',
    gradHero:     'linear-gradient(135deg,#E06835,#F0A050)',
    cardGlass:    'rgba(255,255,255,0.72)',
    cardBorder:   '#FFD5B8',
    certBg:       'rgba(255,249,244,0.88)',
    certBorder:   '#FFCFAA',
    bannerBg:     'linear-gradient(135deg,#FFF4EE,#FFF0E8,#FFF8F4)',
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

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#FDFCFB',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid #F0E8E8',
        borderTopColor: '#E8527A',
        animation: 'spin 0.75s linear infinite',
        marginBottom: 18,
      }} />
      <p style={{ fontSize: 11, color: '#CCC', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>
        Loading Portfolio
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  const [profile, setProfile]   = useState(null)
  const [niches, setNiches]     = useState([])
  const [projects, setProjects] = useState({})
  const [certs, setCerts]       = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
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
          // Merge DB theme with our design override (override wins)
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
  if (error)   return <div style={{ padding: 40 }}>Error: {error}</div>

  const activeNiche  = niches.find(n => n.slug === activeTab)
  const activeTheme  = activeNiche?.theme || {}
  const accentColor  = activeTheme.accent || '#E8527A'
  const gradHero     = activeTheme.gradHero || accentColor
  const bgGrad       = activeTheme.grad || '#FDFCFB'

  return (
    <div style={{ background: '#FDFCFB', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes heroIn   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes modalPop { from { opacity:0; transform:scale(0.93) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .tab-pill { transition: all 0.28s cubic-bezier(0.34,1.4,0.64,1) !important; }
        .tab-pill:hover { transform: translateY(-3px) scale(1.04) !important; }
        .proj-card { transition: all 0.24s ease !important; }
        .proj-card:hover { transform: translateY(-5px) !important; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header style={{
        padding: '90px 40px 56px', textAlign: 'center',
        background: bgGrad,
        transition: 'background 0.6s ease',
        animation: 'heroIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blurred orbs */}
        <div style={{
          position: 'absolute', width: 280, height: 280, borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
          top: -80, right: '15%', pointerEvents: 'none',
          transition: 'background 0.6s ease',
        }} />
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${activeTheme.accentAlt || accentColor}18 0%, transparent 70%)`,
          bottom: -40, left: '10%', pointerEvents: 'none',
        }} />

        {/* Gradient pill badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 16px', borderRadius: 50,
          background: `linear-gradient(90deg, ${accentColor}22, ${activeTheme.accentAlt || accentColor}22)`,
          border: `1px solid ${accentColor}44`,
          marginBottom: 22, transition: 'all 0.5s ease',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: `linear-gradient(135deg, ${accentColor}, ${activeTheme.accentAlt || accentColor})`,
          }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: activeTheme.accentDark || accentColor, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Portfolio
          </span>
        </div>

        <h1 style={{
          fontSize: 48, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05,
          marginBottom: 12, color: '#111',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}>
          {profile?.name || 'Portfolio'}
        </h1>
        <p style={{
          fontSize: 15, fontWeight: 700, marginBottom: 20, letterSpacing: 0.3,
          background: gradHero,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'all 0.5s ease',
        }}>
          {profile?.title}
        </p>
        <p style={{ color: '#777', maxWidth: 520, margin: '0 auto', lineHeight: 1.85, fontSize: 14 }}>
          {profile?.bio}
        </p>
      </header>

      {/* ── TAB NAV ──────────────────────────────────────────────── */}
      <nav style={{
        display: 'flex', justifyContent: 'center', gap: 10,
        margin: '-20px 0 48px', flexWrap: 'wrap', padding: '0 20px',
        position: 'relative', zIndex: 10,
      }}>
        {niches.map(n => {
          const isActive = activeTab === n.slug
          const t = n.theme || {}
          return (
            <button
              key={n.id}
              className="tab-pill"
              onClick={() => setActiveTab(n.slug)}
              style={{
                padding: '11px 24px', borderRadius: 50, border: 'none', cursor: 'pointer',
                background: isActive
                  ? `linear-gradient(135deg, ${t.accent || '#888'}, ${t.accentAlt || t.accent || '#888'})`
                  : '#F0EFED',
                color: isActive ? '#FFF' : '#888',
                fontWeight: 800, fontSize: 13, letterSpacing: 0.3,
                boxShadow: isActive ? `0 6px 20px ${t.accent || '#888'}44` : 'none',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {n.icon && <span style={{ marginRight: 7, fontSize: 14 }}>{n.icon}</span>}
              {n.name}
            </button>
          )
        })}
      </nav>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main ref={portfolioRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px' }}>
        {activeTab && (
          <NichePanel
            key={activeTab}
            niche={niches.find(n => n.slug === activeTab)}
            projects={projects[activeTab] || []}
            certificates={certs.filter(c => c.niche === activeTab)}
          />
        )}
      </main>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <ContactSection profile={profile} theme={activeTheme} />

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background: '#111', padding: '40px', color: '#fff', textAlign: 'center' }}>
        <div style={{
          width: 36, height: 3, borderRadius: 2, margin: '0 auto 18px',
          background: `linear-gradient(90deg, ${accentColor}, ${activeTheme.accentAlt || accentColor})`,
          transition: 'background 0.5s ease',
        }} />
        <p style={{ fontSize: 12, color: '#666', letterSpacing: 0.5 }}>
          © {new Date().getFullYear()} {profile?.name} &nbsp;·&nbsp; Built with care ✦
        </p>
      </footer>
    </div>
  )
}