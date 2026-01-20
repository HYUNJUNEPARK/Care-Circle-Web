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
import type SlideMenuItem from "../../../types/local/SlidMenuItem";


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

    const styles = {
        greetingIcon: {
            fontSize: '32px',
        },
        sectionTitle: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#4b5563',
            padding: '0 4px',
            marginBottom: '8px',
        },
        insightCard: {
            background: 'linear-gradient(to bottom right, #a855f7, #4f46e5)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s',
            marginBottom: '24px',
        },
        insightCardHover: {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        insightContent: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '16px',
        },
        insightIcon: {
            fontSize: '32px',
        },
        insightText: {
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '1.75',
            flex: '1',
        },
        moreButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            fontWeight: '500',
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s',
        },
        summaryCard: {
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px',
        },
        summaryItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#374151',
            marginBottom: '12px',
        },
        summaryItemIcon: {
            fontSize: '20px',
        },
        summaryItemText: {
            fontWeight: '500',
        },
        badge: {
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: '600',
            marginLeft: 'auto',
        },
        badgeYellow: {
            backgroundColor: '#fef3c7',
            color: '#92400e',
        },
        badgeIndigo: {
            backgroundColor: '#e0e7ff',
            color: '#3730a3',
        },
        divider: {
            paddingTop: '16px',
            borderTop: '1px solid #f3f4f6',
        },
        checkButton: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '16px',
        },
        checkButtonDefault: {
            backgroundColor: '#4f46e5',
            color: 'white',
        },
        checkButtonChecked: {
            backgroundColor: '#22c55e',
            color: 'white',
        },
        checkButtonContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
        },
        quickAccessHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '12px',
        },
        quickAccessLine: {
            height: '1px',
            backgroundColor: '#d1d5db',
            flex: '1',
        },
        quickAccessText: {
            fontWeight: '500',
        },
        quickGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '12px',
        },
        quickButton: {
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
        },
        quickButtonContent: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '12px',
        } as const,
        iconCircle: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
            fontSize: '24px',
        },
        iconCircleBlue: {
            backgroundColor: '#dbeafe',
        },
        iconCircleGreen: {
            backgroundColor: '#dcfce7',
        },
        iconCirclePurple: {
            backgroundColor: '#f3e8ff',
        },
        quickButtonText: {
            fontWeight: '600',
            color: '#1f2937',
        },
    };

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
                background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
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
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#1f2937',
                            }}>
                                <span style={styles.greetingIcon}>{greetingIcon}</span>
                                <span>{greeting}</span>
                            </div>
                            <button
                                style={{
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                onClick={() => {
                                    setIsMenuOpen(true);
                                }}
                            >
                                ☰
                            </button>
                        </div>

                        {/* 오늘의 건강 인사이트 */}
                        <div>
                            <h2 style={styles.sectionTitle}>오늘의 건강 인사이트</h2>
                            <div
                                style={{
                                    ...styles.insightCard,
                                    ...(hoverStates.insight ? styles.insightCardHover : {})
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, insight: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, insight: false }))}
                            >
                                <div style={styles.insightContent}>

                                    <div style={styles.insightText}>
                                        {healthInsight?.content}
                                    </div>
                                </div>

                                <button
                                    style={{
                                        ...styles.moreButton,
                                        color: hoverStates.insight ? 'white' : 'rgba(255, 255, 255, 0.9)'
                                    }}
                                >
                                    더보기 ›
                                </button>
                            </div>
                        </div>



                        <div>
                            <h2 style={styles.sectionTitle}>오늘의 알림 요약</h2>
                            <div style={styles.summaryCard}>
                                <div style={styles.summaryItem}>
                                    <span style={styles.summaryItemIcon}>☀️</span>
                                    <span style={styles.summaryItemText}>아침</span>
                                    <span style={{ ...styles.badge, ...styles.badgeYellow }}>1건</span>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span style={styles.summaryItemIcon}>🌙</span>
                                    <span style={styles.summaryItemText}>저녁</span>
                                    <span style={{ ...styles.badge, ...styles.badgeIndigo }}>2건</span>
                                </div>

                                <div style={styles.divider}>
                                    <button
                                        onClick={() => {
                                            toggleMedCheck('today')
                                        }

                                        }
                                        style={{
                                            ...styles.checkButton,
                                            ...(checkedMeds['today'] ? styles.checkButtonChecked : styles.checkButtonDefault),
                                            ...(hoverStates.checkButton && !checkedMeds['today'] ? { backgroundColor: '#4338ca' } : {})
                                        }}
                                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, checkButton: true }))}
                                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, checkButton: false }))}
                                    >
                                        {checkedMeds['today'] ? (
                                            <span style={styles.checkButtonContent}>
                                                ✅ 완료했어요!
                                            </span>
                                        ) : (
                                            '오늘 복용 체크'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={styles.quickAccessHeader}>
                                <div style={styles.quickAccessLine}></div>
                                <span style={styles.quickAccessText}>빠른 이동</span>
                                <div style={styles.quickAccessLine}></div>
                            </div>

                            <div style={styles.quickGrid}>
                                <button
                                    style={{
                                        ...styles.quickButton,
                                        ...(hoverStates.challenge ? {
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            transform: 'translateY(-4px)'
                                        } : {})
                                    }}
                                    onMouseEnter={() => setHoverStates(prev => ({ ...prev, challenge: true }))}
                                    onMouseLeave={() => setHoverStates(prev => ({ ...prev, challenge: false }))}
                                >
                                    <div style={styles.quickButtonContent}>
                                        <div style={{
                                            ...styles.iconCircle,
                                            ...styles.iconCircleGreen,
                                            backgroundColor: hoverStates.challenge ? '#bbf7d0' : '#dcfce7'
                                        }} />
                                        <span style={styles.quickButtonText}>영양제</span>
                                    </div>
                                </button>

                                <button
                                    style={{
                                        ...styles.quickButton,
                                        ...(hoverStates.health ? {
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            transform: 'translateY(-4px)'
                                        } : {})
                                    }}
                                    onMouseEnter={() => setHoverStates(prev => ({ ...prev, health: true }))}
                                    onMouseLeave={() => setHoverStates(prev => ({ ...prev, health: false }))}
                                >
                                    <div
                                        style={styles.quickButtonContent}
                                        onClick={() => {
                                            handleSignOut();
                                        }}
                                    >
                                        <div style={{
                                            ...styles.iconCircle,
                                            ...styles.iconCircleBlue,
                                            backgroundColor: hoverStates.health ? '#bfdbfe' : '#dbeafe'
                                        }}>
                                            ℹ️
                                        </div>
                                        <span
                                            style={styles.quickButtonText}

                                        >건강 정보</span>
                                    </div>
                                </button>
                            </div>

                            <button
                                style={{
                                    ...styles.quickButton,
                                    width: '100%',
                                    ...(hoverStates.report ? {
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        transform: 'translateY(-4px)'
                                    } : {})
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, report: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, report: false }))}
                            >
                                <div style={styles.quickButtonContent}>
                                    <div style={{
                                        ...styles.iconCircle,
                                        ...styles.iconCirclePurple,
                                        backgroundColor: hoverStates.report ? '#e9d5ff' : '#f3e8ff'
                                    }}>
                                        📊
                                    </div>
                                    <span style={styles.quickButtonText}>리포트</span>
                                </div>
                            </button>

                            <button
                                style={{
                                    marginTop: '12px',
                                    ...styles.quickButton,
                                    width: '100%',
                                    ...(hoverStates.report ? {
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        transform: 'translateY(-4px)'
                                    } : {})
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, report: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, report: false }))}
                            >
                                <div style={styles.quickButtonContent}>
                                    <div style={{
                                        ...styles.iconCircle,
                                        ...styles.iconCirclePurple,
                                        backgroundColor: hoverStates.report ? '#e9d5ff' : '#f3e8ff'
                                    }}>
                                        📊
                                    </div>
                                    <span style={styles.quickButtonText}>리포트</span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
};