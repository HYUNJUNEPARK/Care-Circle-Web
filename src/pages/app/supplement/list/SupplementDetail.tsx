
interface SupplementDetailProps {
    supplement: {
        id: string;
        name: string;
        imageUrl?: string;
        effects?: string;
        description?: string;
        [key: string]: any;
    };
    onClose: () => void;
}

/**
 * 
 */
export default function SupplementDetail({
    supplement,
    onClose
}: SupplementDetailProps) {
    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                width: '100%',
                maxWidth: 400,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                padding: '24px 20px 20px 20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        color: '#8B95A1',
                        cursor: 'pointer',
                    }}
                    aria-label="닫기"
                >
                    ×
                </button>
                {supplement.imageUrl ? (
                    <img
                        src={supplement.imageUrl}
                        alt={supplement.name}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 16,
                            objectFit: 'cover',
                            marginBottom: 16,
                            background: '#F7F9FC',
                        }}
                    />
                ) : (
                    <div style={{
                        width: 120,
                        height: 120,
                        borderRadius: 16,
                        background: '#E6F0FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 48,
                        marginBottom: 16,
                    }}>
                        💊
                    </div>
                )}
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333D4B', marginBottom: 8, textAlign: 'center' }}>{supplement.name}</h2>
                {supplement.effects && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, justifyContent: 'center' }}>
                        {supplement.effects.split(',').map((effect: string, idx: number) => (
                            <span key={idx} style={{ background: '#E6F0FF', color: '#0056FF', fontSize: 13, fontWeight: 600, borderRadius: 6, padding: '4px 10px' }}>{effect.trim()}</span>
                        ))}
                    </div>
                )}
                {supplement.description && (
                    <p style={{ fontSize: 15, color: '#8B95A1', lineHeight: 1.6, marginBottom: 0, textAlign: 'center' }}>{supplement.description}</p>
                )}
            </div>
        </div>
    );
}
