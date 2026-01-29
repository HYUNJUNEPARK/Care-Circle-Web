import { useEffect, useState, useRef, useCallback } from "react";
import HealthItemDetail from '../HealthItemDetail';
import HeartActionOverlay from '../../../../components/alert/HeartActionOverlay';
//import useLoading from "../../../../components/loading/loading/useLoading";
import { useNavigate } from "react-router-dom";
import { Body, Container, Header } from '../../../../components/layouts';
import useHealthItemsWithInListFlag from "./useHealthItemsWithInListFlag";

/**
 * 영양 아이템 리스트 선택 페이지
 */
export default function HealthItemEditor() {
    const navigate = useNavigate();
    const {
        supplements,
        getSupplements, loadMoreSupplements, addHealthItemInList, removeHealthItemFromList,
        pagination
    } = useHealthItemsWithInListFlag();

    // 하트 액션 오버레이 상태
    const [heartAction, setHeartAction] = useState<null | 'add' | 'remove'>(null);
    // 상세보기 모달 상태
    const [selectedDetailSupplement, setSelectedDetailSupplement] = useState<any | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

    //
    useEffect(() => {
        getSupplements(1);
    }, []);

    // useEffect(() => {
    //     updateLoading(isLoading);
    // }, [isLoading]);

    // 무한 스크롤 콜백
    const handleLoadMore = useCallback(() => {
        if (pagination?.hasNext) {
            loadMoreSupplements();
        }
    }, [pagination, loadMoreSupplements]);

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
                title="편집"
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
                                            position: 'relative',
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
                                        onClick={async () => {
                                            if (supplement.isInList) {
                                                try {
                                                    await removeHealthItemFromList(supplement.id);
                                                    setHeartAction('remove');
                                                    setTimeout(() => setHeartAction(null), 1200);
                                                } catch {}
                                            } else {
                                                try {
                                                    await addHealthItemInList(supplement.id);
                                                    setHeartAction('add');
                                                    setTimeout(() => setHeartAction(null), 1200);
                                                } catch {}
                                            }
                                        }}
                                    >
                                        {/* 체크 표시 (항상 공간 차지, 값이 1/0이어도 boolean처럼 처리) */}
                                        {Number(supplement.isInList) === 1 ? (
                                            <div style={{
                                                position: 'absolute',
                                                top: '8px',
                                                left: '8px',
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: '#0046FF',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 1,
                                            }}>
                                                <span style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                }}>✓</span>
                                            </div>
                                        ) : (
                                            <div style={{
                                                position: 'absolute',
                                                top: '8px',
                                                left: '8px',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 1,
                                                backgroundColor: 'transparent',
                                            }} />
                                        )}

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
                                            // 이미지가 없을 때 기본 아이콘
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
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '6px',
                                                minHeight: '44px',
                                            }}>
                                                <h3 style={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: '#333D4B',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    lineHeight: '1.4',
                                                    margin: 0,
                                                }}>
                                                    {supplement.name}
                                                </h3>
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: 0,
                                                        marginLeft: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        height: '24px',
                                                    }}
                                                    aria-label="상세보기"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedDetailSupplement(supplement);
                                                    }}
                                                >
                                                    {/* 돋보기 SVG 아이콘 */}
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="7" stroke="#8B95A1" strokeWidth="2" />
                                                        <line x1="14.2929" y1="14.7071" x2="18" y2="18.4142" stroke="#8B95A1" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>

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
            {/* 하트 액션 오버레이 */}
            {heartAction && <HeartActionOverlay action={heartAction} />}
            {/* 상세보기 모달 */}
            {selectedDetailSupplement && (
                <HealthItemDetail
                    supplement={selectedDetailSupplement}
                    onClose={() => setSelectedDetailSupplement(null)}
                />
            )}
        </Container>
    );
};