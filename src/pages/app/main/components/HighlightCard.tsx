import { useState } from 'react';

interface HighlightCard {
    content?: string;
    style?: React.CSSProperties;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function HighlightCard({
    content,
    buttonText,
    onButtonClick,
    style
}: HighlightCard) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                background: 'var(--color-primary-color)',
                borderRadius: '16px',
                padding: '24px',
                color: 'white',
                boxShadow: isHovered
                    ? '0 20px 25px -5px rgba(0, 68, 255, 0.3)'
                    : '0 10px 15px -3px rgba(0, 70, 255, 0.2)',
                transition: 'box-shadow 0.3s',
                marginBottom: '24px',
                ...style,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.75', flex: '1', color: '#ffffff' }}>
                    {content}
                </div>
            </div>

            <button
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                }}
                onClick={onButtonClick}
            >
                {buttonText}
            </button>
        </div>
    );
}
