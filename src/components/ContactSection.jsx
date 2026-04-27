import { useState } from 'react'

export default function ContactSection({ profile, accentColor = '#D4607A' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const valid = form.name.length > 0 && form.email.includes('@') && form.message.length > 0

  const PROFILE_EMAIL = profile?.email || 'aleinafayeg@gmail.com'
  const WHATSAPP_NUMBER = profile?.whatsapp || '639XXXXXXXXX' // update in DB: profile.whatsapp

  // Build redirect hrefs
  const emailHref = `mailto:${PROFILE_EMAIL}`
  const waHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(profile?.name || 'there')}!%20I%20found%20your%20portfolio%20and%20would%20love%20to%20connect.`
  const mailtoBody = `mailto:${PROFILE_EMAIL}?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent(`Hi ${profile?.name || 'there'}!\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`

  const contactLinks = [
    {
      label: 'Email',
      value: PROFILE_EMAIL,
      icon: '✉️',
      hint: 'Open in mail app',
      href: emailHref,
      bg: '#FDE8ED',
      border: '#F0B8C5',
      textColor: '#8B1A32',
      hoverBg: '#F7C5D0',
    },
    {
      label: 'WhatsApp',
      value: 'Message Me on WhatsApp',
      icon: '💬',
      hint: 'Open WhatsApp chat',
      href: waHref,
      bg: '#E7F6F2',
      border: '#A5C9CA',
      textColor: '#1A5C4B',
      hoverBg: '#C8EBE4',
    },
  ]

  function handleSend() {
    // Opens mail client pre-filled — no backend needed
    window.location.href = mailtoBody
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section style={{ padding: '70px 20px', background: '#fff', borderTop: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: accentColor, margin: '0 auto 18px', transition: 'background 0.4s' }} />
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 10, letterSpacing: -0.5 }}>Let's Work Together</h2>
          <p style={{ color: '#888', fontSize: 14, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            Ready to bring your vision to life? Reach out through any of these channels.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

          {/* ── LEFT: Contact redirect buttons ── */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
              Direct Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contactLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === 'WhatsApp' ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{
                    padding: '16px 20px',
                    background: link.bg,
                    borderRadius: 14,
                    border: `1.5px solid ${link.border}`,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = link.hoverBg
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 6px 20px ${link.border}66`
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = link.bg
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: '#fff', border: `1px solid ${link.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: link.textColor }}>
                      {link.label}
                    </p>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: '#111' }}>{link.value}</p>
                  </div>
                  <span style={{ fontSize: 16, color: link.textColor, opacity: 0.6 }}>→</span>
                </a>
              ))}
            </div>

            {/* Social links if available */}
            {(profile?.linkedin || profile?.instagram || profile?.facebook) && (
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
                  Socials
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {profile?.facebook && (
                    <a href={profile.facebook} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: '#E7EEF8', color: '#1877F2', fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #C5D6F0' }}>
                      Facebook
                    </a>
                  )}
                  {profile?.instagram && (
                    <a href={profile.instagram} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: '#FDE8ED', color: '#C13584', fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #F0B8C5' }}>
                      Instagram
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 10, background: '#E8F0F8', color: '#0077B5', fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #C0D8EE' }}>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Quick message form (opens mailto) ── */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
              Quick Message
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.borderColor = accentColor}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
              <input
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.borderColor = accentColor}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
              <textarea
                placeholder="Your message…"
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, resize: 'vertical', outline: 'none', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.borderColor = accentColor}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
              <button
                disabled={!valid}
                onClick={handleSend}
                style={{
                  padding: '14px 20px',
                  background: valid ? accentColor : '#D1D5DB',
                  color: '#fff',
                  borderRadius: 10,
                  border: 'none',
                  cursor: valid ? 'pointer' : 'not-allowed',
                  fontWeight: 800,
                  fontSize: 14,
                  transition: 'all 0.2s',
                  boxShadow: valid ? `0 4px 16px ${accentColor}44` : 'none',
                  letterSpacing: 0.3,
                }}
                onMouseOver={e => { if (valid) e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none' }}
              >
                {sent ? '✓ Opening Mail App…' : '✉ Send via Email →'}
              </button>
              <p style={{ fontSize: 11, color: '#AAA', textAlign: 'center', marginTop: -4 }}>
                Opens your email client pre-filled
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}