export default function Tag({ label, theme }) {
  return (
    <span style={{
      fontSize:11, padding:'4px 10px', borderRadius:20, fontWeight:800,
      background:theme?.tagBg||'#F3F4F6',
      color:theme?.tag||'#555',
      border:`1.5px solid ${theme?.border||'#E5E7EB'}`,
      letterSpacing:0.2, whiteSpace:'nowrap',
    }}>
      {label}
    </span>
  )
}