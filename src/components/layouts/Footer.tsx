/**
 * Footer 컴포넌트
 * 하단 고정 레이아웃
 */
interface FooterProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Footer({
  children,
  style,
}: FooterProps) {
  return (
    <div
      style={{
        padding: "0 16px 24px", //상 좌우 하
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default Footer;