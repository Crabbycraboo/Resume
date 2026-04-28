import { useState } from 'react'

export default function ContactSection({ profile, theme = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent]  = useState(false)

  const valid = form.name.length > 0 && form.email.includes('@') && form.message.length > 0

  const PROFILE_EMAIL = profile?.email || 'aleinafayeg@gmail.com'
  const WA_LINK       = profile?.whatsapp_link || 'https://wa.me/639985801867'

  const accent     = theme?.accent     || '#E8527A'
  const accentAlt  = theme?.accentAlt  || accent
  const accentDark = theme?.accentDark || '#8B1A32'
  const accentLight= theme?.accentLight|| '#FFF0F3'
  const border     = theme?.border     || '#F8C0CC'
  const gradHero   = theme?.gradHero   || `linear-gradient(135deg,${accent},${accentAlt})`

  const mailtoBody = `mailto:${PROFILE_EMAIL}?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent(`Hi ${profile?.name || 'there'}!\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`

  function handleSend() {
    window.location.href = mailtoBody
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const contactLinks = [
    {
      label: 'Email', value: PROFILE_EMAIL, icon: '✉️',
      href: `mailto:${PROFILE_EMAIL}`,
      bg: accentLight, borderColor: border, textColor: accentDark,
    },
    {
      label: 'WhatsApp', value: 'Message Me on WhatsApp', icon: '💬',
      href: WA_LINK, newTab: true,
      bg: '#E7F6F2', borderColor: '#A5C9CA', textColor: '#1A5C4B',
    },
  ]

  return (
    <section style={{ padding: '80px 20px', background: '#fff', borderTop: '1px solid #F0F0EE' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', width: 42, height: 4, borderRadius: 2,
            background: gradHero, margin: '0 auto 20px', transition: 'background 0.4s',
          }} />
          <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: -1, marginBottom: 12, color: '#111' }}>
            Let's Work Together
          </h2>
          <p style={{ color: '#999', fontSize: 14, maxWidth: 380, margin: '0 auto', lineHeight: 1.8 }}>
            Ready to bring your vision to life? Reach out — always happy to connect.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>

          {/* LEFT: Redirect buttons */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 900, color: '#CCC', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
              Direct Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {contactLinks.map(link => (
                <a key={link.label} href={link.href}
                  target={link.newTab ? '_blank' : undefined} rel="noreferrer"
                  style={{
                    padding: '17px 20px', background: link.bg, borderRadius: 16,
                    border: `1.5px solid ${link.borderColor}`,
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all 0.22s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 8px 24px ${link.borderColor}88`
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 13, background: '#fff',
                    border: `1px solid ${link.borderColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, color: link.textColor }}>
                      {link.label}
                    </p>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: '#111' }}>{link.value}</p>
                  </div>
                  <span style={{ fontSize: 14, color: link.textColor, opacity: 0.5 }}>→</span>
                </a>
              ))}
            </div>

            {/* Socials */}
            {(profile?.linkedin || profile?.instagram || profile?.facebook) && (
              <>
                <p style={{ fontSize: 10, fontWeight: 900, color: '#CCC', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
                  Socials
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {profile?.facebook && (
                    <a href={profile.facebook} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: '#E7EEF8', color: '#1877F2', fontWeight: 800, fontSize: 12, textDecoration: 'none', border: '1px solid #C5D6F0' }}>
                      Facebook
                    </a>
                  )}
                  {profile?.instagram && (
                    <a href={profile.instagram} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: accentLight, color: accentDark, fontWeight: 800, fontSize: 12, textDecoration: 'none', border: `1px solid ${border}` }}>
                      Instagram
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: '#E8F0F8', color: '#0077B5', fontWeight: 800, fontSize: 12, textDecoration: 'none', border: '1px solid #C0D8EE' }}>
                      LinkedIn
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Form */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 900, color: '#CCC', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
              Quick Message
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['name','email'].map(field => (
                <input key={field}
                  placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={{ padding: '14px 16px', borderRadius: 12, border: '1.5px solid #EBEBEB', fontSize: 14, outline: 'none', transition: 'border 0.2s', background: '#FAFAF9' }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = '#EBEBEB'}
                />
              ))}
              <textarea placeholder="Your message…" rows={4} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 12, border: '1.5px solid #EBEBEB', fontSize: 14, resize: 'vertical', outline: 'none', transition: 'border 0.2s', background: '#FAFAF9' }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = '#EBEBEB'}
              />
              <button disabled={!valid} onClick={handleSend} style={{
                padding: '15px 20px',
                background: valid ? gradHero : '#E0DFDC',
                color: '#fff', borderRadius: 12, border: 'none',
                cursor: valid ? 'pointer' : 'not-allowed',
                fontWeight: 900, fontSize: 14, letterSpacing: 0.3,
                boxShadow: valid ? `0 6px 20px ${accent}44` : 'none',
                transition: 'all 0.22s ease',
              }}
                onMouseOver={e => { if (valid) e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none' }}
              >
                {sent ? '✓ Opening Mail App…' : '✉ Send via Email →'}
              </button>
              <p style={{ fontSize: 11, color: '#CCC', textAlign: 'center', marginTop: -4 }}>
                Opens your email client pre-filled
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}