import { useState } from 'react';
import type SlideMenuItem from '../../../../types/local/SlidMenuItem';

interface SlideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: SlideMenuItem[];
    userEmail?: string | null;
}

export default function SlideMenu({
    isOpen,
    onClose,
    menuItems,
    userEmail
}: SlideMenuProps) {
    const [menuItemHover, setMenuItemHover] = useState<number | null>(null);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '400px',
                backgroundColor: 'white',
                zIndex: 1000,
                boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
            }}
        >
            <div
                style={{
                    padding: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1f2937',
                    }}
                >
                    {userEmail}
                </h2>
                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        padding: '8px',
                        color: '#6b7280',
                        transition: 'color 0.2s',
                    }}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1f2937';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#6b7280';
                    }}
                >
                    ✕
                </button>
            </div>

            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px 0',
                }}
            >
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 24px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            border: 'none',
                            background: 'none',
                            width: '100%',
                            textAlign: 'left',
                            backgroundColor: menuItemHover === item.id ? '#f3f4f6' : 'transparent',
                        }}
                        onMouseEnter={() => setMenuItemHover(item.id)}
                        onMouseLeave={() => setMenuItemHover(null)}
                        onClick={() => {
                            item.action();
                            onClose();
                        }}
                    >
                        {/* <span style={{ fontSize: '24px' }}>{item.icon}</span> */}
                        <span
                            style={{
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#1f2937',
                            }}
                        >
                            {item.text}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
