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
import HighlightCard from './components/HighlightCard';
import type SlideMenuItem from "../../../types/local/SlidMenuItem";
import { IoMenuOutline } from "react-icons/io5";

/**
 배경: #F7F9FC (신한 스타일 밝은 회색)
헤더 인사말: #0046FF (신한 브랜드 블루)
건강 인사이트 카드: 신한 블루 그라디언트 (135deg, #0046FF → #0073FF)
섹션 제목: #333D4B (진한 네이비)
복용 체크 버튼: #0046FF / hover #0056FF (신한 블루)
빠른 이동 버튼: #E6F0FF / hover #CCE1FF (밝은 블루 계열)
리포트 버튼 아이콘: #E6F0FF / hover #CCE1FF
텍스트: #333D4B (진한 네이비) 및 #8B95A1 (회색)
 */

export default function Main() {
    const { user } = useAuth();
    const { signOut, isLoading, error } = useSignOut();
    const { fetchHealthInsight, healthInsight } = useHealthInsight();
    const { showAlert } = useAlert();
    const { updateLoading } = useLoading();
    const navigate = useNavigate();

    //
    useEffect(() => {
        fetchHealthInsight();
    }, []);


    useEffect(() => {
        updateLoading(isLoading);
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
                background: '#F7F9FC',
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
                                color: '#000000',
                            }}>
                                <span style={{ fontSize: '28px' }}>{greetingIcon}</span>
                                <span>{greeting}</span>
                            </div>

                            {/* 메뉴 버튼 */}
                            <IoMenuOutline size={32} onClick={() => setIsMenuOpen(true)} />
                        </div>

                        {/* 오늘의 건강 인사이트 */}
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#333D4B', padding: '0 4px', marginBottom: '8px' }}>오늘의 건강 인사이트</h2>
                            <HighlightCard
                                content={healthInsight?.content}
                                buttonText="더보기 ›"
                                onButtonClick={() => alert('ASDF')}/>
                        </div>

                        {/* 오늘의 알림 요약 */}
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#333D4B', padding: '0 4px', marginBottom: '8px' }}>오늘의 알림 요약</h2>
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
                                            backgroundColor: checkedMeds['today'] ? '#22c55e' : (hoverStates.checkButton ? 'var(--color-primary-color)' : 'var(--color-primary-color)'),
                                            color: '#ffffff',
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: '#8B95A1', marginBottom: '12px' }}>
                                <div style={{ height: '1px', backgroundColor: '#d1d5db', flex: '1' }}></div>
                                <span style={{ fontWeight: '500' }}>빠른 이동</span>
                                <div style={{ height: '1px', backgroundColor: '#d1d5db', flex: '1' }}></div>
                            </div>

                            {/* 빠른 이동: Grid 3 */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                                <QuickAccessButton
                                    text="영양제 관리"
                                    onClick={() => { navigate(PATH.MY_SUPPLEMENTS); }} />

                                <QuickAccessButton
                                    text="health" />

                                <QuickAccessButton
                                    text="challenge" />
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
                                        backgroundColor: hoverStates.report ? '#CCE1FF' : '#E6F0FF'
                                    }}>
                                        📊
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#333D4B' }}>리포트</span>
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
                                        backgroundColor: hoverStates.report ? '#CCE1FF' : '#E6F0FF'
                                    }}>
                                        📊
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#333D4B' }}>리포트</span>
                                </div>
                            </button>


                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
};