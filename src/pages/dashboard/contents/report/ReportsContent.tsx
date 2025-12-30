//import { FileText } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";

export default function ReportsContent() {
    const reports = [
        { title: '월간 매출 리포트', desc: '2024년 9월 매출 현황' },
        { title: '사용자 활동 리포트', desc: '최근 30일 사용자 활동 분석' },
        { title: '상품 성과 리포트', desc: '베스트 셀러 및 재고 현황' }
    ];
    return (
        <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
                리포트
            </h1>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{ padding: '1.5rem' }}>
                    {reports.map((r, i) => (
                        <div key={i} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            cursor: 'pointer',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <h3 style={{ fontWeight: 600, color: '#1f2937' }}>{r.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{r.desc}</p>
                                </div>
                                <FaRegUser color="#9ca3af" size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}