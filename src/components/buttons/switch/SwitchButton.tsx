type SwitchButtonProps = {
    isOn: boolean;
    onChange: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
};

function SwitchButton({
    isOn,
    onChange,
    disabled = false,
    style
}: SwitchButtonProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={isOn}
            onClick={onChange}
            disabled={disabled}
            style={{
                position: 'relative',
                width: '44px',
                height: '24px',
                backgroundColor: isOn ? '#2563eb' : '#d1d5db',
                borderRadius: '12px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                padding: 0,
                opacity: disabled ? 0.5 : 1,
                ...style,
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '2px',
                    left: isOn ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            />
        </button>
    );
}

export default SwitchButton;
