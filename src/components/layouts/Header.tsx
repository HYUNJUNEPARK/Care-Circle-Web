import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

/**
 * 헤더 컴포넌트
 * - 좌측에 뒤로가기 버튼, 중앙에 제목, 우측에 닫기 버튼을 배치
 */
interface HeaderProps {
    title?: string;
    style?: React.CSSProperties;
    onBackButtonClick?: () => void;
    onCloseButtonClick?: () => void;
}

function Header({
    title,
    style,
    onBackButtonClick,
    onCloseButtonClick,
}: HeaderProps) {
    /**
     * 버튼이 없을 때도 레이아웃 폭을 유지하는 placeholder
     */
    function DummyIcon() {
        return <div style={{ width: 24, height: 24 }} />
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 40px", //3열 그리드: 좌 40px, 중앙 auto, 우 40px
            alignItems: "center",
            height: "42px",
            padding: "16px 16px 0px", //상 좌우 하
            // boxSizing: "border-box",
            // borderBottom: "1px solid #e0e0e0",
            ...style,
        }}>
            {/* 좌측 영역 */}
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                {onBackButtonClick ? (
                    <IoIosArrowBack size={24} onClick={onBackButtonClick} color="#3d3d3dff" />
                ) : (
                    <DummyIcon />
                )}
            </div>

            {/* 중앙 제목 */}
            <h1 style={{
                color: "#3d3d3dff",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
            }}>{title}</h1>

            {/* 우측 영역 */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
            }}>
                {onCloseButtonClick ? (
                    <IoClose size={24} onClick={onCloseButtonClick} color="#3d3d3dff" />
                ) : (
                    <DummyIcon />
                )}
            </div>
        </div>
    );
}

export default Header;