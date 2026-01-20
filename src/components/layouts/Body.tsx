import { forwardRef } from 'react';

interface BodyProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

/**
 * 메인 컨텐츠 영역 - 스크롤 가능
 * flex: 1로 남은 공간을 차지하되, height: 0을 설정하여 부모의 높이를 넘지 않도록 함
 */
const Body = forwardRef<HTMLDivElement, BodyProps>(
    function Body({
        children,
        style
    }, ref) {
        return (
            <main
                ref={ref}
                style={{
                    padding: '10px 16px', //상하 좌우
                    flex: 1,                    // 남은 공간 전체 차지
                    height: 0,                  // CRITICAL: 부모 높이 유지
                    overflowY: 'auto',          // 세로 스크롤
                    overflowX: 'hidden',        // 가로 스크롤 방지
                    WebkitOverflowScrolling: 'touch', // iOS 스무스 스크롤
                    scrollbarWidth: 'none',     // Firefox / Android WebView
                    msOverflowStyle: 'none',    // IE / Edge
                    backgroundColor: '#fff',
                    ...style
                }}
            >
                {children}
            </main>
        );
    }
);

export default Body;