import { useState, useEffect, useRef } from 'react' // <--- Added useRef here
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { fetchProfile, fetchNiches, fetchAllProjects, fetchAllCertificates } from './lib/supabase'

// 1. Loading screen component
function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#FAFAF9' }}>
      <p style={{ fontSize: 14, color: '#AAA', fontWeight: 600 }}>Loading portfolio…</p>
    </div>
  )
}

export default function App() {
  // 2. All State (Corrected & cleaned)
  const [profile, setProfile] = useState(null)
  const [niches, setNiches] = useState([])
  const [projects, setProjects] = useState({})
  const [certs, setCerts] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(null)
  
  const portfolioRef = useRef(null) // This now works because of the import above

  // 3. Data Fetching
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
        setNiches(nicheData)
        
        // Group projects by niche
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
        console.error("Supabase Error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingScreen />
  if (error) return <div style={{ padding: 40 }}>Error: {error}</div>

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ padding: '80px 40px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>{profile?.name || 'Portfolio'}</h1>
        <p style={{ color: '#D4607A', fontWeight: 700 }}>{profile?.title}</p>
        <p style={{ marginTop: 20, color: '#666', maxWidth: 600, margin: '20px auto' }}>{profile?.bio}</p>
      </header>

      {/* TABS */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
        {niches.map(n => (
          <button 
            key={n.id} 
            onClick={() => setActiveTab(n.slug)}
            style={{
              padding: '10px 20px', borderRadius: 25, border: 'none', cursor: 'pointer',
              background: activeTab === n.slug ? '#111' : '#EEE',
              color: activeTab === n.slug ? '#FFF' : '#666',
              fontWeight: 600
            }}
          >
            {n.name}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <main ref={portfolioRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>
        {activeTab && (
          <NichePanel
            niche={niches.find(n => n.slug === activeTab)}
            projects={projects[activeTab] || []}
            certificates={certs.filter(c => c.niche === activeTab)}
          />
        )}
      </main>

      <ContactSection profile={profile} />

      <footer style={{ background: '#111', padding: '40px', color: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: 14 }}>© {new Date().getFullYear()} {profile?.name}</p>
      </footer>
    </div>
  )
}