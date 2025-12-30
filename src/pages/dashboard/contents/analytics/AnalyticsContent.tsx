export default function AnalyticsContent() {
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        통계
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {['방문자 통계', '매출 통계'].map((title, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
              {title}
            </h2>
            <div style={{
              height: '16rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280'
            }}>
              차트가 여기에 표시됩니다
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

