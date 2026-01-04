import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function Topbar({
    title,
    onBack,
    onClose,
}: {
    title: string;
    onBack?: () => void; // 없으면 좌측 비움
    onClose?: () => void; // 없으면 우측 비움
}) {
    /**
     * 버튼이 없을 때도 레이아웃 폭을 유지하는 placeholder
     */
    function DummyIcon() {
        return <div style={{ width: 24, height: 24 }} />
    }

    return (
        <div style={{ ...topbarContainer }}>
            {/* 좌측 영역 */}
            <div style={{ ...iconContainer }}>
                {onBack ? (
                    <IoIosArrowBack size={24} onClick={onBack} color="#3d3d3dff" />
                ) : (
                    <DummyIcon />
                )}
            </div>

            {/* 중앙 제목 */}
            <h1 style={{...titleStyle}}>{title}</h1>

            {/* 우측 영역 */}
            <div style={{ ...iconContainer, justifyContent: "flex-end" }}>
                {onClose ? (
                    <IoClose size={24} onClick={onClose} color="#3d3d3dff" />
                ) : (
                    <DummyIcon />
                )}
            </div>
        </div>
    );
}

const topbarContainer: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "40px 1fr 40px", //3열 그리드: 좌 40px, 중앙 auto, 우 40px
    alignItems: "center",
    height: "42px"
}

const iconContainer: React.CSSProperties = {
    display: "flex",
    alignItems: "center"
};

const titleStyle: React.CSSProperties = {
    color:"#3d3d3dff",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold"
}

export default Topbar;