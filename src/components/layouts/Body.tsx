function Body({
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
        ...bodyStyle,
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

const bodyStyle: React.CSSProperties = {
  flex: 1,
  minHeight: "calc(97vh - 42px - 62px)", //97vh - Topbar - Footer
};

export default Body;