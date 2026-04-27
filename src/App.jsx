import { useState, useEffect } from 'react'
import NichePanel from './components/NichePanel'
import ContactSection from './components/ContactSection'
import { 
  fetchProfile, 
  fetchNiches, 
  fetchAllProjects, 
  fetchAllCertificates 
} from './lib/supabase'

// ── Internal Components ──
const LoadingScreen = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAF9' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #DDD', borderTop: '3px solid #D4607A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <p style={{ marginTop: 15, color: '#999', fontSize: 14 }}>Connecting to Supabase...</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
)

const ErrorScreen = ({ message }) => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center' }}>
    <h2 style={{ color: '#D4607A' }}>Connection Error</h2>
    <p style={{ color: '#666', maxWidth: 400 }}>{message}. Check if your .env file has the correct Supabase URL and Key.</p>
    <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#111', color: '#fff', cursor: 'pointer' }}>Retry</button>
  </div>
)

export default function App() {
  const [profile, setProfile] = useState(null)
  const [niches, setNiches] = useState([])
  const [projects, setProjects] = useState({})
  const [certs, setCerts] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [profData, nicheData, projData, certData] = await Promise.all([
          fetchProfile(),
          fetchNiches(),
          fetchAllProjects(),
          fetchAllCertificates(),
        ])

        setProfile(profData)
        setNiches(nicheData)
        
        // Group projects by niche_slug
        const grouped = (projData || []).reduce((acc, p) => {
          const slug = p.niche_slug || 'other'
          if (!acc[slug]) acc[slug] = []
          acc[slug].push(p)
          return acc
        }, {})
        
        setProjects(grouped)
        setCerts(certData || [])
        
        if (nicheData && nicheData.length > 0) {
          setActiveTab(nicheData[0].slug)
        }
      } catch (err) {
        console.error("Fetch Error:", err)
        setError(err.message || "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <header style={{ padding: '80px 40px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: 0 }}>{profile?.name}</h1>
          <p style={{ fontSize: 18, color: '#D4607A', fontWeight: 700, margin: '8px 0' }}>{profile?.title}</p>
          <p style={{ marginTop: 20, color: '#666', lineHeight: 1.6 }}>{profile?.bio}</p>
        </div>
      </header>

      {/* Tabs */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, padding: '0 20px', flexWrap: 'wrap' }}>
        {niches.map(n => (
          <button 
            key={n.id} 
            onClick={() => setActiveTab(n.slug)}
            style={{
              padding: '10px 20px', borderRadius: 25, border: 'none', cursor: 'pointer', fontWeight: 700,
              background: activeTab === n.slug ? '#111' : '#EEE',
              color: activeTab === n.slug ? '#FFF' : '#666',
              transition: 'all 0.2s'
            }}
          >
            {n.title}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>
        {activeTab && niches.find(n => n.slug === activeTab) && (
          <NichePanel
            niche={niches.find(n => n.slug === activeTab)}
            projects={projects[activeTab] || []}
            certificates={certs.filter(c => c.niche === activeTab)}
          />
        )}
      </main>

      {/* Contact */}
      <ContactSection profile={profile} />

      {/* Footer */}
      <footer style={{ background: '#111', padding: '40px', color: '#fff', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>© {new Date().getFullYear()} {profile?.name}</p>
      </footer>
    </div>
  )
}