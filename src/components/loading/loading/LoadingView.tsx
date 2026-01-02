
// 로딩 Overlay 컴포넌트
const LoadingOverlay: React.FC = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>로딩 중...</p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    spinner: {
        width: '64px',
        height: '64px',
        border: '4px solid #ebe7e5ff',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    text: {
        color: '#374151',
        fontWeight: '500',
        margin: 0,
        fontSize: '16px',
    },
};

export default LoadingOverlay;