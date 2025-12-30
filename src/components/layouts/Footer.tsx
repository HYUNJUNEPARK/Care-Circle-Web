
function Footer({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...footerStyle,
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

const footerStyle: React.CSSProperties = {
  height: "62px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export default Footer;