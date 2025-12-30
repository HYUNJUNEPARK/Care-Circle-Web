function CenterLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {children}
    </div>
}

export default CenterLayout;