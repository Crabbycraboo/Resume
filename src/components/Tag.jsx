export default function Tag({ label, theme }) {
  return (
    <span style={{
      fontSize: 11,
      padding: '3px 9px',
      borderRadius: 20,
      fontWeight: 700,
      background: theme?.tagBg || '#F3F4F6',
      color: theme?.tag || '#555',
      border: `1px solid ${theme?.border || '#E5E7EB'}`,
      letterSpacing: 0.2,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}
