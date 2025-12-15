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
  minHeight: "calc(100vh - 180px)" // minHeight: "90vh",  min-height: calc(100vh - 96px);
};

export default Body;