import { AiTwotoneHeart } from "react-icons/ai";

interface HeartActionOverlayProps {
    action: 'add' | 'remove';
}

function HeartActionOverlay({
    action
}: HeartActionOverlayProps) {
    const message = action === 'add' ? '추가되었습니다.' : '취소되었습니다.';
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                background: 'rgba(0,0,0,0.4)',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    width: '160px',
                    height: '200px', // 4:5 비율, 세로가 더 긴 형태
                    padding: '20px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        animation: 'pop 0.4s cubic-bezier(.36,1.56,.64,1)',
                    }}
                >
                    <AiTwotoneHeart size={48} color={action === 'add' ? '#ef476f' : '#bdbdbd'} />
                </div>
                <p
                    style={{
                        color: '#374151',
                        fontWeight: 500,
                        margin: 0,
                        fontSize: '16px',
                    }}
                >
                    {message}
                </p>
            </div>
        </div>
    );
}

export default HeartActionOverlay;
