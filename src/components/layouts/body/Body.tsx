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
  minHeight: "90vh",
};

export default Body;