import useAuth from "../../../network/auth/useAuth";
import { useEffect, useRef, useCallback } from "react";
//import useSignOut from '../../../hook/useSignOut';
import useAlert from "../../../components/alert/useAlert";
import useLoading from "../../../components/loading/loading/useLoading";
import { useNavigate } from "react-router-dom";
import { Body, Container, Header } from '../../../components/layouts';
import useSupplements from "../supplement/useSupplements";
import { PATH } from "../../../constants/paths";

/**
 * 내 영양 아이템 페이지
 */
export default function UserSupplementList() {
    const { user } = useAuth();
    //const { signOut, isLoading, error } = useSignOut();
    const { showAlert } = useAlert();
    const { updateLoading } = useLoading();
    const navigate = useNavigate();
    const { supplements, pagination, getUserSupplements, isLoading, loadMoreSupplements } = useSupplements();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

    //
    useEffect(() => {
        getUserSupplements(1, 20);
    }, []);

    useEffect(() => {
        updateLoading(isLoading);
    }, [isLoading]);

    //무한 스크롤 콜백
    const handleLoadMore = useCallback(() => {
        if (pagination?.hasNext && !isLoading) {
            loadMoreSupplements();
        }
    }, [pagination, isLoading, loadMoreSupplements]);

    // Intersection Observer 설정
    useEffect(() => {
        if (!loadMoreTriggerRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(loadMoreTriggerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleLoadMore]);

    return (
        <Container>
            <Header
                title="영양 관리"
                style={{
                    background: '#F7F9FC',
                }}
                onBackButtonClick={() => navigate(-1)}
            />

            <Body style={{
                background: '#F7F9FC',
                position: 'relative',
                overflowX: 'hidden',
            }}>
                <div>
                    <div style={{
                        margin: '0 auto',
                    }}>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '18px',
                        }}>

                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#333D4B' }}>내 영양 리스트</h2>
                            <span
                                style={{ fontSize: '16px', color: '#8B95A1', cursor: 'pointer' }}
                                onClick={() => navigate(PATH.MANAGE_SUPPLEMENTS)}
                            >편집 ›</span>
                        </div>

                        {/* 영양제 리스트 */}
                        {supplements && supplements.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '12px',
                                marginTop: '12px',
                            }}>
                                {supplements.map((supplement) => (
                                    <div
                                        key={supplement.id}
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '16px',
                                            padding: '16px',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                            transition: 'all 0.3s',
                                            cursor: 'pointer',
                                            border: '1px solid #E8ECF0',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 70, 255, 0.15)';
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.borderColor = '#0046FF';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = '#E8ECF0';
                                        }}
                                        onClick={() => console.log('Supplement clicked:', supplement.id)}
                                    >
                                        {/* 이미지 */}
                                        {supplement.imageUrl ? (
                                            <div style={{
                                                width: '100%',
                                                aspectRatio: '1 / 1',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                marginBottom: '12px',
                                                backgroundColor: '#F7F9FC',
                                            }}>
                                                <img
                                                    src={supplement.imageUrl}
                                                    alt={supplement.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                aspectRatio: '1 / 1',
                                                borderRadius: '12px',
                                                backgroundColor: '#E6F0FF',
                                                marginBottom: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '48px',
                                            }}>
                                                💊
                                            </div>
                                        )}

                                        {/* 영양제 정보 */}
                                        <div>
                                            <h3 style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                color: '#333D4B',
                                                marginBottom: '6px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: '1.4',
                                                minHeight: '44px',
                                            }}>
                                                {supplement.name}
                                            </h3>

                                            {/* 효능 태그 */}
                                            {supplement.effects && (
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '6px',
                                                    marginBottom: '8px',
                                                }}>
                                                    {supplement.effects.split(',').slice(0, 2).map((effect, index) => (
                                                        <span
                                                            key={index}
                                                            style={{
                                                                display: 'inline-block',
                                                                padding: '4px 8px',
                                                                backgroundColor: '#E6F0FF',
                                                                color: '#0056FF',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            {effect.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* 설명 */}
                                            {supplement.description && (
                                                <p style={{
                                                    fontSize: '13px',
                                                    color: '#8B95A1',
                                                    lineHeight: '1.5',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                }}>
                                                    {supplement.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '48px 20px',
                                color: '#8B95A1',
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    marginBottom: '16px',
                                }}>
                                    📦
                                </div>
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#333D4B',
                                    marginBottom: '8px',
                                }}>
                                    영양제가 없습니다
                                </p>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#8B95A1',
                                }}>
                                    영양제를 추가해보세요
                                </p>
                            </div>
                        )}

                        {/* 무한 스크롤 트리거 */}
                        {pagination?.hasNext && (
                            <div
                                ref={loadMoreTriggerRef}
                                style={{
                                    height: '20px',
                                    margin: '20px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '3px solid #E6F0FF',
                                    borderTop: '3px solid #0046FF',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }} />
                            </div>
                        )}

                    </div>
                </div>
            </Body>
        </Container>
    );
};