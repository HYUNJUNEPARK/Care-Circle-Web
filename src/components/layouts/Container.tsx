interface AppContainerProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

function Container({
    children,
    style,
    ...rest
}: AppContainerProps) {
    return (
        // 외부 래퍼: 브라우저에서 모바일 앱처럼 보이게 하는 역할
        <div
            style={{
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0', // 외부 배경색 (모바일 디바이스 느낌)
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0', // 상하 여백
            }}
        >
            {/* 실제 앱 컨테이너: 고정된 높이와 너비를 가진 모바일 뷰포트 */}
            <div
                style={{
                    width: 'min(100%, 420px)', // 최대 420px, 모바일에서는 100%
                    height: 'min(100vh, 844px)', // 최대 844px (iPhone 14 Pro 높이), 모바일에서는 100vh
                    backgroundColor: '#ffffff',
                    borderRadius: 'min(20px, 0px)', // 데스크톱에서만 둥근 모서리
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)', // 그림자로 떠있는 느낌
                    overflow: 'hidden', // 내부 컨텐츠가 밖으로 나가지 않도록
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </div>
    );
}

export default Container;