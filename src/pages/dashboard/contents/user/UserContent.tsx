export default function UsersContent() {
  const users = [
    { uid: "IsMbDvqC8CW5mge0B4MClqn8e4W2", email: 'kim@example.com', role: '관리자', status: '활성', createAt: '2025-12-12', updateAt: '2025-12-12', lastLoginAt: '2026-01-01' },
    { uid: "IsMbDvqC8CW5mge0B4MClqn8e4W2", email: 'lee@example.com', role: '사용자', status: '비활성', createAt: '2025-12-12', updateAt: '2025-12-12', lastLoginAt: '2026-01-01' },

  ];




  
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        사용자 관리
      </h1>


      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>

        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>사용자 목록</h2>
          {/* <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}>
            새 사용자 추가
          </button> */}
        </div>


        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['이메일', 'uid', '역할', '상태', '작업', '가입일', '수정일', '마지막 로그인'].map((th, i) => (
                  <th key={i} style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>{th}</th>
                ))}
              </tr>
            </thead>


            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.uid}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.role}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}>{u.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                    {/* <button style={{ color: '#3b82f6', marginRight: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }}>편집</button>
                    <button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>삭제</button> */}
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}>비밀번호 초기화</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.createAt}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.updateAt}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>{u.lastLoginAt}</td>


                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>
    </div>
  );
}
