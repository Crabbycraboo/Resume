import { useState } from 'react'

const PROFILE_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'aleinafayeg@gmail.com'
const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.me/639985801867'
const RESUME_URL    = import.meta.env.VITE_RESUME_URL    || '/Aleina_Faye_Franco_Resume.pdf'

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  
  // Use data from the profile table instead of local constants
  const PROFILE_EMAIL = profile?.email || 'aleinafayeg@gmail.com'
  const WHATSAPP_LINK = profile?.whatsapp_link || ''
  const RESUME_URL    = profile?.resume_url || '#'

  const links = [
    {
      label: 'Email',
      value: PROFILE_EMAIL,
      href: `mailto:${PROFILE_EMAIL}`,
      icon: '✉',
      bg: '#FDE8ED',
      border: '#F0B8C5',
      textColor: '#8B1A32',
    },
    {
      label: 'WhatsApp',
      value: 'Chat with me',
      href: WHATSAPP_LINK,
      icon: '💬',
      bg: '#E7F6F2',
      border: '#A5C9CA',
      textColor: '#2C3333',
    },
    {
      label: 'Resume',
      value: 'Download PDF',
      href: RESUME_URL,
      icon: '📄',
      bg: '#F3F4F6',
      border: '#E5E7EB',
      textColor: '#374151',
    },
  ]

  return (
    <section id="contact" style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: '#D4607A', letterSpacing: 2, textTransform: 'uppercase' }}>
          Get In Touch
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#111', margin: '0 0 12px', letterSpacing: -0.5 }}>
          Let's Work Together
        </h2>
        <p style={{ fontSize: 15, color: '#666', margin: '0 auto', lineHeight: 1.7, maxWidth: 440 }}>
          Looking for a dedicated student leader or creative partner? Fill in the form and it'll open directly in your mail app — no middleman.
        </p>
      </div>

      <div
        className="contact-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}
      >
        {/* ── Message Composer ── */}
        <div style={{
          background: '#fff', borderRadius: 18, padding: 26,
          border: '1.5px solid #EDEDED', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: '#111' }}>
            Send a message
          </p>
          <p style={{ margin: '0 0 18px', fontSize: 12, color: '#999' }}>
            Fills your email app automatically — just hit Send.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              style={{ padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E5E7EB', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            />
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email Address"
              style={{ padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E5E7EB', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            />
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project or inquiry..."
              rows={4}
              style={{ padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E5E7EB', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
            />

            {/* mailto: anchor styled as button — real, works without any backend */}
            <a
              href={valid ? buildMailto() : undefined}
              onClick={e => { if (!valid) e.preventDefault() }}
              style={{
                display: 'block', textAlign: 'center',
                padding: '12px 20px', borderRadius: 10,
                background: valid ? 'linear-gradient(135deg,#D4607A,#E8829A)' : '#E5E7EB',
                color: valid ? '#fff' : '#AAA',
                fontSize: 14, fontWeight: 800,
                textDecoration: 'none',
                cursor: valid ? 'pointer' : 'default',
                transition: 'opacity 0.15s',
                opacity: valid ? 1 : 0.7,
              }}
            >
              Open in Mail App →
            </a>

            {valid && (
              <p style={{ margin: 0, fontSize: 11, color: '#AAA', textAlign: 'center', lineHeight: 1.5 }}>
                This opens your default mail client with the message pre-filled.
              </p>
            )}
          </div>
        </div>

        {/* ── Links Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {links.map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.download ? undefined : '_blank'}
              rel="noreferrer"
              download={item.download || undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 13,
                padding: '16px 18px',
                background: item.bg,
                border: `1.5px solid ${item.border}`,
                borderRadius: 13,
                textDecoration: 'none', color: 'inherit',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#fff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 17,
                border: `1px solid ${item.border}`, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 10, color: item.textColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {item.label}
                </p>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#111' }}>
                  {item.value}
                </p>
              </div>
            </a>
          ))}

          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(135deg,#FDE8ED,#FFF0F3)',
            border: '1.5px solid #F0B8C5', borderRadius: 13,
          }}>
            <p style={{ margin: '0 0 3px', fontSize: 10, color: '#D4607A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
              🐷 Collaborative Projects
            </p>
            <p style={{ margin: '0 0 3px', fontSize: 13.5, fontWeight: 800, color: '#111' }}>
              Student Leadership & Design
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#777', lineHeight: 1.5 }}>
              Available for Media Graphics, UI/UX, and Social Media VA roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}