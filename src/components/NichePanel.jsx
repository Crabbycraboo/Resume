import { useState } from 'react'
import ProjectCard from './ProjectCard'
import CertGrid from './CertGrid'
import Modal from './Modal'
import Tag from './Tag'

// ─── PER-NICHE RESUME DATA ────────────────────────────────────────────────────
const RESUME_DATA = {
  creative: {
    objective: "Multi-skilled freelancer and co-founder of YCC Studio with 20–40 published social media assets, design-and-caption experience across real clients, and B2-level English proficiency (ProGo certified). Available part-time for content creation, graphic design, and social media management roles.",
    skills: [
      { category: "Design", items: ["Canva (Intermediate)", "Pubmat & Poster Design", "Visual Branding", "Multi-page Layout"] },
      { category: "Content", items: ["Caption Writing", "AI-Assisted Copywriting", "Content Editing & Proofreading", "Student Journalism (Top 6 Weekly Writer)"] },
      { category: "Platforms", items: ["Facebook / Meta", "TikTok Shop", "Google Drive", "ChatGPT Workflow"] },
      { category: "Soft Skills", items: ["Creative Direction", "Deadline Management", "Client Communication", "Adaptability"] },
    ],
    experience: [
      {
        role: "Co-Founder & Creative Lead",
        org: "YCC Studio",
        period: "2024 – Present",
        bullets: [
          "Co-founded a 2-person creative services studio offering graphic design, editing, proofreading, and digital invitations to student and freelance clients.",
          "Designed 20+ branded social media posts, pricelist graphics, and team introduction series using Canva with consistent visual identity.",
          "Wrote captions and marketing copy for all studio promotional materials, maintaining professional tone across platforms.",
          "Managed client communications, delivery timelines, and content scheduling independently.",
        ]
      },
      {
        role: "Social Media Content Designer",
        org: "Mitsubishi Sales Agent (Freelance)",
        period: "2024 – 2025",
        bullets: [
          "Produced 7-part vehicle promo series and a 5-part objection-handling content campaign for a Mitsubishi sales agent's Facebook page.",
          "Wrote all sales captions with a bold, conversational tone targeting Filipino car buyers.",
          "Designed consistent visual branding using automotive-inspired layouts in Canva.",
        ]
      },
      {
        role: "Media Graphics Head",
        org: "SED Student Council, Siena College of Taytay",
        period: "Mar 2026 – Present",
        bullets: [
          "Lead all graphic design output for the SED College Student Council, producing event posters, dress code guides, and official announcements.",
          "Designed 8-part Sports Fest pubmat series and Premier Gala campaign materials distributed across school social media.",
          "Collaborate with council officers to align visuals with event branding and deadlines.",
        ]
      },
      {
        role: "Media & Marketing Officer",
        org: "CEIT Department, Siena College of Taytay",
        period: "2024 – Present",
        bullets: [
          "Create and publish official departmental promotional materials for academic and extracurricular events.",
          "Maintain consistent visual identity across all CEIT digital communications.",
        ]
      },
      {
        role: "School Journalist",
        org: "Horizon Publication, Sumulong Memorial High School",
        period: "2021 – 2022",
        bullets: [
          "Published articles as a school journalist, achieving Top 6 Weekly Writer recognition.",
          "Demonstrated strong written English communication and editorial discipline under publishing deadlines.",
        ]
      },
    ],
    relevantCerts: ["Principles of Graphic Design", "Video Editing Using an Open-Source Software"],
    education: true,
  },
  admin: {
    objective: "IT student with hands-on government data experience (60 hrs, PSA-Rizal), 2 live-deployed web applications, and a strong foundation in documentation, record management, and research. Seeking part-time administrative support, data entry, or junior web development roles.",
    skills: [
      { category: "Technical", items: ["React.js", "Vercel Deployment", "Python (Certified)", "SQL (Certified)", "Google Colab"] },
      { category: "Admin", items: ["Data Entry & Record Management", "Research & Documentation", "File & Schedule Management", "Google Docs / Drive / Sheets"] },
      { category: "Tools", items: ["VS Code", "GitHub", "Supabase", "MS Office Suite (Intermediate)", "ChatGPT / AI Tools"] },
      { category: "Soft Skills", items: ["Attention to Detail", "Written Communication", "Initiative", "Time Management"] },
    ],
    experience: [
      {
        role: "Work Immersion Trainee — Statistics & Data",
        org: "Philippine Statistics Authority, Rizal Provincial Office",
        period: "Jan – Mar 2024 (60 hrs)",
        bullets: [
          "Completed 60-hour government work immersion at PSA-Rizal, gaining direct exposure to data handling, record management, and information dissemination processes.",
          "Performed data entry, document filing, and records organization under supervision of statistical officers.",
          "Assisted in the preparation and encoding of government statistical documents, applying accuracy and confidentiality standards.",
          "Developed foundational understanding of public sector data workflows and administrative procedures.",
        ]
      },
      {
        role: "Full-Stack Developer (Solo)",
        org: "Mitsubishi CRM & Sales System — missyoubibi.vercel.app",
        period: "2024 – 2025",
        bullets: [
          "Built and deployed a fully functional CRM and sales tracking web application for a Mitsubishi sales agent using React.js and Vercel.",
          "Designed client lead management, follow-up tracking, and sales pipeline features from scratch with no team support.",
          "Managed end-to-end project delivery including requirements gathering, development, and live deployment.",
        ]
      },
      {
        role: "Full-Stack Developer (Solo)",
        org: "Yakap — Senior Citizens Healthcare App (yakap-zeta.vercel.app)",
        period: "2024",
        bullets: [
          "Independently designed and deployed a public-facing web application to help senior citizens access free Philippine healthcare services.",
          "Applied React.js, component architecture, and Vercel CI/CD for production deployment.",
          "Demonstrated social responsibility and initiative by building for an underserved public sector use case.",
        ]
      },
      {
        role: "Vice President",
        org: "SED Peer Guidance Facilitators, Siena College of Taytay",
        period: "2025 – 2026",
        bullets: [
          "Managed scheduling, documentation, and coordination of peer guidance programs and facilitator activities.",
          "Handled administrative correspondence and maintained organized records of facilitator sessions.",
        ]
      },
    ],
    relevantCerts: ["Data Analysis Essentials using Google Colab", "AI Essentials: Theory and Practice", "Intro to SQL with Taylor Swift", "Programming Foundations with Python", "Microsoft Digital Literacy", "Bit Series: The Art and Code of UI/UX Programming"],
    education: true,
  },
  ecommerce: {
    objective: "Certified e-commerce and customer support professional with product listing writing experience, strong B2-level English communication skills, and familiarity with Shopee, Lazada, and TikTok Shop platforms. Available part-time for product listing, chat support, and e-commerce coordination roles.",
    skills: [
      { category: "E-Commerce", items: ["Product Listing Writing", "Shopee / Lazada / TikTok Shop", "Basic Order Coordination", "Copywriting for Sales"] },
      { category: "Communication", items: ["B2 English — ProGo Certified", "Professional Written Communication", "AI-Assisted Content Editing", "Customer-Facing Messaging"] },
      { category: "Tools", items: ["Google Docs / Drive", "ChatGPT Workflow", "Canva (for product graphics)", "Facebook / Meta"] },
      { category: "Soft Skills", items: ["Responsiveness", "Adaptability", "Attention to Detail", "Professionalism"] },
    ],
    experience: [
      {
        role: "Online Chat Assistant & Roleplay Collaborator",
        org: "Part-Time, Self-Managed",
        period: "May – Jun 2025",
        bullets: [
          "Provided consistent, responsive written communication to clients through online messaging platforms, maintaining professional tone across varied scenarios.",
          "Demonstrated strong written English at B2 proficiency level (ProGo certified) across all client interactions.",
          "Managed own scheduling and client expectations independently, balancing freelance responsibilities alongside full-time academic commitments.",
          "Applied content adaptation skills — adjusting tone, style, and language to meet diverse client needs.",
        ]
      },
      {
        role: "Product Listing Writer (Project-Based)",
        org: "YCC Studio / Independent",
        period: "2024 – Present",
        bullets: [
          "Wrote optimized product descriptions with compelling titles, keyword-aware copy, and clear pricing presentation for e-commerce listings.",
          "Applied knowledge from UPOU's E-Commerce Essentials certification to structure listings for discoverability and conversion.",
        ]
      },
      {
        role: "Co-Founder",
        org: "YCC Studio",
        period: "2024 – Present",
        bullets: [
          "Managed client-facing communications for a 2-person creative services studio, handling inquiries, delivery coordination, and follow-ups professionally.",
          "Maintained organized Google Drive file systems for client deliverables, ensuring timely and accurate file handoff.",
        ]
      },
    ],
    relevantCerts: ["E-Commerce Essentials: A Beginner's Guide", "Introductory Course on Contact Center Services", "Business Concepts, Ideation & the Business Plan", "Social Entrepreneurship"],
    education: true,
  },
}

const EDUCATION = [
  { school: "Siena College of Taytay", degree: "B.S. Information Technology", period: "2024 – Present", note: "Consistent Top Student · Service Awardee" },
  { school: "Sumulong Memorial High School", degree: "Senior High School — STEM Track", period: "2022 – 2024", note: "High Honors Graduate" },
]

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ label, count, theme }) {
  const accent     = theme?.accent     || '#E8527A'
  const accentAlt  = theme?.accentAlt  || accent
  const accentDark = theme?.accentDark || '#111'
  const accentLight= theme?.accentLight|| '#FFF5'
  const border     = theme?.border     || '#EEE'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
      <div style={{ width:5, height:22, borderRadius:3, background:`linear-gradient(180deg,${accent},${accentAlt})` }}/>
      <h3 style={{ margin:0, fontSize:11, fontWeight:900, color:'#333', textTransform:'uppercase', letterSpacing:2.5 }}>
        {label}
      </h3>
      {count !== undefined && (
        <span style={{ fontSize:11, fontWeight:900, color:accentDark, background:accentLight, padding:'3px 11px', borderRadius:20, border:`1.5px solid ${border}` }}>
          {count}
        </span>
      )}
    </div>
  )
}

// ─── RESUME SECTION ───────────────────────────────────────────────────────────
function ResumeSection({ slug, theme, allCerts }) {
  const data = RESUME_DATA[slug]
  if (!data) return null

  const accent      = theme?.accent      || '#E8527A'
  const accentAlt   = theme?.accentAlt   || accent
  const accentDark  = theme?.accentDark  || '#111'
  const accentLight = theme?.accentLight || '#FFF0F3'
  const border      = theme?.border      || '#EEE'
  const cardGlass   = theme?.cardGlass   || 'rgba(255,255,255,0.8)'
  const gradHero    = theme?.gradHero    || `linear-gradient(135deg,${accent},${accentAlt})`
  const bannerBg    = theme?.bannerBg    || accentLight

  const relevantCerts = (allCerts || []).filter(c =>
    data.relevantCerts.some(name => c.title.toLowerCase().includes(name.toLowerCase().slice(0, 20)))
  )

  return (
    <div style={{ marginTop: 60 }}>

      {/* ── RESUME HEADER ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:5, height:28, borderRadius:3, background:gradHero }}/>
          <div>
            <p style={{ margin:0, fontSize:10, fontWeight:900, color:accent, letterSpacing:2.5, textTransform:'uppercase' }}>Resume View</p>
            <h2 style={{ margin:0, fontSize:20, fontWeight:900, color:'#111', letterSpacing:-0.5 }}>
              {slug === 'creative' ? 'Creative & Content' : slug === 'admin' ? 'Admin & Development' : 'E-Commerce & Support'}
            </h2>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <span style={{
            padding:'7px 16px', borderRadius:20, fontSize:11, fontWeight:800,
            background:accentLight, color:accentDark, border:`1.5px solid ${border}`,
          }}>
            📍 Part-time Available
          </span>
          <span style={{
            padding:'7px 16px', borderRadius:20, fontSize:11, fontWeight:800,
            background:accentLight, color:accentDark, border:`1.5px solid ${border}`,
          }}>
            💼 Project-based rates available
          </span>
          <a
            href="/resume/Aleina_Faye_Franco_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              padding:'7px 18px', borderRadius:20, fontSize:11, fontWeight:900,
              background:gradHero, color:'#fff', textDecoration:'none',
              boxShadow:`0 4px 14px ${accent}44`, letterSpacing:0.3,
            }}
          >
            ↓ Download Resume PDF
          </a>
        </div>
      </div>

      {/* ── OBJECTIVE ── */}
      <div style={{
        borderRadius:18, background:bannerBg,
        border:`1.5px solid ${border}`,
        padding:'22px 26px', marginBottom:28,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-40, right:-20, width:120, height:120, borderRadius:'50%', background:`radial-gradient(${accent}14,transparent 70%)`, pointerEvents:'none' }}/>
        <p style={{ margin:'0 0 6px', fontSize:10, fontWeight:900, color:accent, letterSpacing:2, textTransform:'uppercase' }}>Professional Objective</p>
        <p style={{ margin:0, fontSize:13.5, color:'#444', lineHeight:1.85, maxWidth:780 }}>{data.objective}</p>
      </div>

      {/* ── SKILLS MATRIX ── */}
      <div style={{ marginBottom:28 }}>
        <SectionHeader label="Skills & Tools" theme={theme} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
          {data.skills.map(group => (
            <div key={group.category} style={{
              background:cardGlass, borderRadius:14,
              border:`1.5px solid ${border}`,
              padding:'14px 16px',
              backdropFilter:'blur(8px)',
            }}>
              <p style={{ margin:'0 0 10px', fontSize:10, fontWeight:900, color:accent, letterSpacing:2, textTransform:'uppercase' }}>
                {group.category}
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {group.items.map(item => (
                  <span key={item} style={{
                    fontSize:11, fontWeight:700,
                    padding:'3px 9px', borderRadius:20,
                    background:accentLight, color:accentDark,
                    border:`1px solid ${border}`,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <div style={{ marginBottom:28 }}>
        <SectionHeader label="Experience" theme={theme} />
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {data.experience.map((exp, i) => (
            <div key={i} style={{
              background:cardGlass, borderRadius:16,
              border:`1.5px solid ${border}`,
              padding:'18px 22px 18px 26px',
              backdropFilter:'blur(8px)',
              position:'relative', overflow:'hidden',
            }}>
              {/* Left accent bar */}
              <div style={{
                position:'absolute', left:0, top:0, bottom:0, width:5,
                background:gradHero, borderRadius:'16px 0 0 16px',
              }}/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:6 }}>
                <div>
                  <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:900, color:'#111' }}>{exp.role}</p>
                  <p style={{ margin:0, fontSize:12.5, fontWeight:700, color:accent }}>{exp.org}</p>
                </div>
                <span style={{
                  fontSize:10.5, fontWeight:800, color:'#999',
                  background:'#F5F5F5', padding:'3px 10px', borderRadius:20,
                  border:'1px solid #EBEBEB', whiteSpace:'nowrap',
                }}>{exp.period}</span>
              </div>
              <ul style={{ margin:0, paddingLeft:18, display:'flex', flexDirection:'column', gap:5 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize:12.5, color:'#555', lineHeight:1.75 }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <div style={{ marginBottom:28 }}>
        <SectionHeader label="Education" theme={theme} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12 }}>
          {EDUCATION.map((edu, i) => (
            <div key={i} style={{
              background:cardGlass, borderRadius:14,
              border:`1.5px solid ${border}`,
              padding:'14px 18px 14px 22px',
              backdropFilter:'blur(8px)',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg,${accent},${accentAlt})`, borderRadius:'14px 0 0 14px' }}/>
              <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:900, color:'#111' }}>{edu.school}</p>
              <p style={{ margin:'0 0 4px', fontSize:12, fontWeight:700, color:accent }}>{edu.degree}</p>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:4 }}>
                <p style={{ margin:0, fontSize:11, color:'#999' }}>{edu.note}</p>
                <p style={{ margin:0, fontSize:10.5, fontWeight:700, color:'#BBB' }}>{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RELEVANT CERTS ── */}
      {relevantCerts.length > 0 && (
        <div style={{ marginBottom:28 }}>
          <SectionHeader label="Relevant Certifications" count={relevantCerts.length} theme={theme} />
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {data.relevantCerts.map((name, i) => (
              <span key={i} style={{
                fontSize:12, fontWeight:700, padding:'6px 14px', borderRadius:20,
                background:cardGlass, color:accentDark,
                border:`1.5px solid ${border}`,
                backdropFilter:'blur(6px)',
              }}>
                ✓ {name}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NichePanel({ niche, projects, certificates }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeView, setActiveView]     = useState('portfolio') // 'portfolio' | 'resume'

  if (!niche) return null

  const t           = niche.theme || {}
  const accent      = t.accent      || '#E8527A'
  const accentAlt   = t.accentAlt   || accent
  const accentDark  = t.accentDark  || '#111'
  const accentLight = t.accentLight || '#FFF'
  const border      = t.border      || '#EEE'
  const cardGlass   = t.cardGlass   || 'rgba(255,255,255,0.8)'
  const bannerBg    = t.bannerBg    || accentLight
  const gradHero    = t.gradHero    || `linear-gradient(135deg,${accent},${accentAlt})`
  const skills      = niche.skills  || []

  return (
    <div style={{ animation:'fadeUp 0.38s cubic-bezier(0.22,1,0.36,1) both' }}>

      {/* ── NICHE BANNER ── */}
      <div style={{
        borderRadius:22, background:bannerBg,
        border:`1.5px solid ${border}`,
        padding:'28px 32px 24px', marginBottom:28,
        display:'flex', alignItems:'flex-start', gap:22, flexWrap:'wrap',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-60, right:-40, width:220, height:220, borderRadius:'50%', background:`radial-gradient(circle,${accent}18 0%,transparent 70%)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-40, left:-20, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle,${accentAlt}12 0%,transparent 70%)`, pointerEvents:'none' }}/>

        {niche.icon && (
          <div style={{ width:56, height:56, borderRadius:18, flexShrink:0, background:gradHero, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:`0 10px 28px ${accent}44`, color:'#fff' }}>
            {niche.icon}
          </div>
        )}

        <div style={{ flex:1, minWidth:0, position:'relative', zIndex:1 }}>
          <p style={{ margin:'0 0 4px', fontSize:10, fontWeight:900, color:accent, letterSpacing:2.5, textTransform:'uppercase' }}>
            {niche.tagline || ''}
          </p>
          <h2 style={{ margin:'0 0 8px', fontSize:24, fontWeight:900, color:'#111', letterSpacing:-0.5 }}>
            {niche.name}
          </h2>
          {niche.description && (
            <p style={{ margin:'0 0 12px', fontSize:14, color:'#666', lineHeight:1.8, maxWidth:580 }}>
              {niche.description}
            </p>
          )}
          {skills.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {skills.map(s => <Tag key={s} label={s} theme={t}/>)}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:10, flexShrink:0, position:'relative', zIndex:1 }}>
          {projects.length > 0 && (
            <div style={{ textAlign:'center', background:cardGlass, borderRadius:16, padding:'12px 18px', border:`1.5px solid ${border}`, backdropFilter:'blur(10px)' }}>
              <p style={{ margin:0, fontSize:26, fontWeight:900, color:accent, lineHeight:1 }}>{projects.length}</p>
              <p style={{ margin:'3px 0 0', fontSize:9, color:'#AAA', fontWeight:800, textTransform:'uppercase', letterSpacing:1.5 }}>Projects</p>
            </div>
          )}
          {certificates.length > 0 && (
            <div style={{ textAlign:'center', background:cardGlass, borderRadius:16, padding:'12px 18px', border:`1.5px solid ${border}`, backdropFilter:'blur(10px)' }}>
              <p style={{ margin:0, fontSize:26, fontWeight:900, color:accent, lineHeight:1 }}>{certificates.length}</p>
              <p style={{ margin:'3px 0 0', fontSize:9, color:'#AAA', fontWeight:800, textTransform:'uppercase', letterSpacing:1.5 }}>Certs</p>
            </div>
          )}
        </div>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div style={{ display:'flex', gap:8, marginBottom:36 }}>
        {[
          { id:'portfolio', label:'🗂 Portfolio', desc:'Projects & Certificates' },
          { id:'resume',    label:'📄 Resume',    desc:'Experience & Skills' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            style={{
              padding:'12px 22px', borderRadius:14, border:'none', cursor:'pointer',
              background: activeView === v.id
                ? gradHero
                : cardGlass,
              color: activeView === v.id ? '#fff' : '#888',
              fontWeight:800, fontSize:13,
              boxShadow: activeView === v.id ? `0 6px 20px ${accent}44` : 'none',
              border: activeView === v.id ? 'none' : `1.5px solid ${border}`,
              backdropFilter:'blur(8px)',
              transition:'all 0.22s ease',
              display:'flex', flexDirection:'column', alignItems:'flex-start', gap:2,
            }}
          >
            <span>{v.label}</span>
            <span style={{ fontSize:10, fontWeight:600, opacity:0.75 }}>{v.desc}</span>
          </button>
        ))}
      </div>

      {/* ── PORTFOLIO VIEW ── */}
      {activeView === 'portfolio' && (
        <>
          {projects.length > 0 && (
            <section style={{ marginBottom:52 }}>
              <SectionHeader label="Portfolio Projects" count={projects.length} theme={t}/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(252px,1fr))', gap:18 }}>
                {projects.map(p => (
                  <ProjectCard key={p.id} project={p} theme={t} onClick={()=>setSelectedItem(p)}/>
                ))}
              </div>
            </section>
          )}

          {certificates.length > 0 && (
            <section style={{ marginBottom:24 }}>
              <SectionHeader label="Certifications" count={certificates.length} theme={t}/>
              <CertGrid certs={certificates} theme={t}/>
            </section>
          )}

          {projects.length === 0 && certificates.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 20px', color:'#DDD' }}>
              <div style={{ fontSize:38, marginBottom:14 }}>✦</div>
              <p style={{ fontWeight:700, fontSize:14 }}>No content yet for this niche</p>
            </div>
          )}
        </>
      )}

      {/* ── RESUME VIEW ── */}
      {activeView === 'resume' && (
        <ResumeSection slug={niche.slug} theme={t} allCerts={certificates} />
      )}

      {selectedItem && (
        <Modal item={selectedItem} theme={t} onClose={()=>setSelectedItem(null)}/>
      )}
    </div>
  )
}