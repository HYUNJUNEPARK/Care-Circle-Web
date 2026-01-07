function CenterLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <div
        style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0efefff"
        }}
    >
        {children}
    </div>
}

export default CenterLayout;