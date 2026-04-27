import { useState } from 'react'

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  
  // FIXED: Define 'valid' so the component doesn't crash
  const valid = form.name.length > 0 && form.email.includes('@') && form.message.length > 0

  const PROFILE_EMAIL = profile?.email || 'aleinafayeg@gmail.com'

  const links = [
    { label: 'Email', value: PROFILE_EMAIL, icon: '✉', bg: '#FDE8ED', border: '#F0B8C5', textColor: '#8B1A32' },
    { label: 'WhatsApp', value: 'Message Me', icon: '💬', bg: '#E7F6F2', border: '#A5C9CA', textColor: '#2C3333' }
  ]

  return (
    <section style={{ padding: '60px 20px', background: '#fff', borderTop: '1px solid #eee' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>Get in Touch</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {links.map(link => (
              <div key={link.label} style={{ padding: 15, background: link.bg, borderRadius: 12, border: `1px solid ${link.border}` }}>
                <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: link.textColor }}>{link.label}</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{link.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <input 
            placeholder="Your Name" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            style={{ padding: 15, borderRadius: 8, border: '1px solid #ddd' }} 
          />
          <input 
            placeholder="Your Email" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            style={{ padding: 15, borderRadius: 8, border: '1px solid #ddd' }} 
          />
          <textarea 
            placeholder="Message" 
            rows={4}
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            style={{ padding: 15, borderRadius: 8, border: '1px solid #ddd' }} 
          />
          <button 
            disabled={!valid}
            style={{ 
              padding: 15, 
              background: valid ? '#111' : '#ccc', 
              color: '#fff', 
              borderRadius: 8, 
              border: 'none', 
              cursor: valid ? 'pointer' : 'not-allowed' 
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  )
}