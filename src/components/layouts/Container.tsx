
import type React from 'react';

function Container({
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
                ...containerStyle,
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    width: "min(100%, 380px)",
    padding: 16,
    borderRadius: 18,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column"
};

export default Container;