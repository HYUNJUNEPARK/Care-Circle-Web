import { useState } from 'react';

interface QuickAccessButtonProps {
    text: string;
    icon?: string;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    onClick?: () => void;
}

export default function QuickAccessButton({
    text,
    icon,
    backgroundColor = "#E6F0FF",
    hoverBackgroundColor = "#CCE1FF",
    onClick,
}: QuickAccessButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
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
                    backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor
                }}>
                    {icon}
                </div>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{text}</span>
            </div>
        </button>
    );
}
