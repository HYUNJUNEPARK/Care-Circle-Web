import useAuth from "../../../network/auth/useAuth";
import { useEffect, useState } from "react";
import useSignOut from '../../../hook/useSignOut';
import useAlert from "../../../components/alert/useAlert";
import useLoading from "../../../components/loading/loading/useLoading";
import { useNavigate } from "react-router-dom";
import { PATH } from '../../../constants/paths';
import { Body, Container } from '../../../components/layouts';
import useHealthInsight from "./useHealthInsight";
import SlideMenu from './components/SlideMenu';
import QuickAccessButton from './components/QuickAccessButton';
import type SlideMenuItem from "../../../types/local/SlidMenuItem";
import { IoMenuOutline } from "react-icons/io5";

export default function Main() {
    const { user } = useAuth();
    const { signOut, isLoading, error } = useSignOut();
    const { fetchHealthInsight, healthInsight } = useHealthInsight();
    const { showAlert } = useAlert();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    //
    useEffect(() => {
        fetchHealthInsight();
    }, []);


    useEffect(() => {
        if (isLoading) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoading]);


    useEffect(() => {
        if (!error) return;
        showAlert({
            title: '로그아웃 실패',
            message: error.message,
            cancelText: null,
        });
    }, [error]);

    const handleSignOut = async () => {
        await signOut();
        navigate(PATH.ROOT, { replace: true });
    };
    const [checkedMeds, setCheckedMeds] = useState<Record<string, boolean>>({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMedCheck = (id: string) => {
        setCheckedMeds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? '좋은 아침이에요' : currentHour < 18 ? '좋은 오후에요' : '좋은 저녁이에요';
    const greetingIcon = currentHour < 12 ? '👋' : currentHour < 18 ? '☀️' : '🌙';

    const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({
        insight: false,
        health: false,
        challenge: false,
        report: false,
        checkButton: false,
    });

    const menuItems: SlideMenuItem[] = [
        { id: 1, text: '홈', action: () => console.log('홈') },
        { id: 2, text: '영양제 관리', action: () => console.log('영양제') },
        { id: 3, text: '리포트', action: () => console.log('리포트') },
        { id: 4, text: '설정', action: () => console.log('설정') },
        { id: 5, text: '프로필', action: () => console.log('프로필') },
        { id: 6, text: '로그아웃', action: handleSignOut },
    ];

    return (
        <Container>
            <Body style={{
                padding: '12px',
                background: '#f1f6fa', //그라디에이션 'linear-gradient(to bottom right, #f5f8fb, #eaeefd)'
                position: 'relative',
                overflowX: 'hidden',
            }}>
                {/* 슬라이드 메뉴 */}
                <SlideMenu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    menuItems={menuItems}
                    userEmail={user?.email}
                />

                <div>
                    <div style={{
                        maxWidth: '672px',
                        margin: '0 auto',
                    }}>

                        {/* Header */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '24px',
                            }}
                        >
                            {/* 인사 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#1f2937',
                            }}>
                                <span style={{ fontSize: '28px' }}>{greetingIcon}</span>
                                <span>{greeting}</span>
                            </div>

                            {/* 메뉴 버튼 */}
                            <IoMenuOutline size={32} onClick={() => setIsMenuOpen(true)} />
                        </div>

                        {/* 오늘의 건강 인사이트 */}
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563', padding: '0 4px', marginBottom: '8px' }}>오늘의 건강 인사이트</h2>
                            <div
                                style={{
                                    background: 'linear-gradient(to bottom right, #a855f7, #4f46e5)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    color: 'white',
                                    boxShadow: hoverStates.insight ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    transition: 'box-shadow 0.3s',
                                    marginBottom: '24px',
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, insight: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, insight: false }))}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>

                                    <div style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.75', flex: '1' }}>
                                        {healthInsight?.content}
                                    </div>
                                </div>

                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: hoverStates.insight ? 'white' : 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        marginLeft: 'auto',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    더보기 ›
                                </button>
                            </div>
                        </div>

                        {/* 오늘의 알림 요약 */}
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563', padding: '0 4px', marginBottom: '8px' }}>오늘의 알림 요약</h2>
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '20px' }}>☀️</span>
                                    <span style={{ fontWeight: '500' }}>아침</span>
                                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600', marginLeft: 'auto', backgroundColor: '#fef3c7', color: '#92400e' }}>1건</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '20px' }}>🌙</span>
                                    <span style={{ fontWeight: '500' }}>저녁</span>
                                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600', marginLeft: 'auto', backgroundColor: '#e0e7ff', color: '#3730a3' }}>2건</span>
                                </div>

                                <div style={{ paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                                    <button
                                        onClick={() => {
                                            toggleMedCheck('today')
                                        }

                                        }
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            fontSize: '16px',
                                            backgroundColor: checkedMeds['today'] ? '#22c55e' : (hoverStates.checkButton ? '#4338ca' : '#4f46e5'),
                                            color: 'white',
                                        }}
                                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, checkButton: true }))}
                                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, checkButton: false }))}
                                    >
                                        {checkedMeds['today'] ? (
                                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                ✅ 완료했어요!
                                            </span>
                                        ) : (
                                            '오늘 복용 체크'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 빠른 이동 */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                                <div style={{ height: '1px', backgroundColor: '#d1d5db', flex: '1' }}></div>
                                <span style={{ fontWeight: '500' }}>빠른 이동</span>
                                <div style={{ height: '1px', backgroundColor: '#d1d5db', flex: '1' }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                                <QuickAccessButton
                                    text="insight"
                                    backgroundColor="#dcfce7"
                                    hoverBackgroundColor="#bbf7d0" />

                                <QuickAccessButton
                                    text="health"
                                    backgroundColor="#dcfce7"
                                    hoverBackgroundColor="#bbf7d0" />

                                <QuickAccessButton
                                    text="challenge"
                                    backgroundColor="#dcfce7"
                                    hoverBackgroundColor="#bbf7d0" />

                            </div>

                            <button
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    boxShadow: hoverStates.report ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    width: '100%',
                                    transform: hoverStates.report ? 'translateY(-4px)' : 'translateY(0)',
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, report: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, report: false }))}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background-color 0.3s',
                                        fontSize: '24px',
                                        backgroundColor: hoverStates.report ? '#e9d5ff' : '#f3e8ff'
                                    }}>
                                        📊
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#1f2937' }}>리포트</span>
                                </div>
                            </button>

                            <button
                                style={{
                                    marginTop: '12px',
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    boxShadow: hoverStates.report ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    width: '100%',
                                    transform: hoverStates.report ? 'translateY(-4px)' : 'translateY(0)',
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, report: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, report: false }))}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background-color 0.3s',
                                        fontSize: '24px',
                                        backgroundColor: hoverStates.report ? '#e9d5ff' : '#f3e8ff'
                                    }}>
                                        📊
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#1f2937' }}>리포트</span>
                                </div>
                            </button>


                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
};