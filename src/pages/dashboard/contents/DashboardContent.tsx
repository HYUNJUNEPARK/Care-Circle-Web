// import { 
//   Users, ShoppingCart, BarChart3,
//   User, ChevronRight
// } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";


// 각 메뉴별 Content 컴포넌트
export default function DashboardContent() {
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        대시보드
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: '총 사용자', value: '1,234', icon: <FaRegUser color="#3b82f6" size={32} /> },
          { label: '총 매출', value: '₩45,678,900', icon: <FaRegUser color="#10b981" size={32} /> },
          { label: '주문 수', value: '567', icon: <FaRegUser color="#f59e0b" size={32} /> },
          { label: '성장률', value: '+12.5%', icon: <FaRegUser color="#8b5cf6" size={32} /> }
        ].map((item, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>{item.value}</p>
              </div>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
          최근 활동
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              icon: <FaRegUser color="white" size={20} />,
              bg: '#3b82f6',
              title: '새로운 사용자가 가입했습니다',
              time: '5분 전'
            },
            {
              icon: <FaRegUser color="white" size={20} />,
              bg: '#10b981',
              title: '새로운 주문이 접수되었습니다',
              time: '12분 전'
            }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: item.bg,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#1f2937' }}>{item.title}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

