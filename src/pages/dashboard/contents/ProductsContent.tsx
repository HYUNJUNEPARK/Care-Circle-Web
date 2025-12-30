export default function ProductsContent() {
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        상품 관리
      </h1>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <div style={{
                  width: '100%',
                  height: '12rem',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}></div>
                <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>상품 {i}</h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>₩{29900 - (i * 10000)}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>재고: {45 - (i * 10)}개</p>
                <button style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  편집
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
