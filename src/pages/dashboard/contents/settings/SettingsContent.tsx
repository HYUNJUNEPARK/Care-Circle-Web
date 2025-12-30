export default function SettingsContent() {
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        설정
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
              일반 설정
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  사이트 이름
                </label>
                <input
                  type="text"
                  placeholder="My Admin Site"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  관리자 이메일
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
              알림 설정
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#374151' }}>이메일 알림</span>
                <input type="checkbox" defaultChecked style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#374151' }}>푸시 알림</span>
                <input type="checkbox" style={{ width: '1rem', height: '1rem' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}