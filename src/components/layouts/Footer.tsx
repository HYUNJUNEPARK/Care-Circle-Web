
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
  paddingTop: 12,
  paddingBottom: 12,
};

export default Footer;