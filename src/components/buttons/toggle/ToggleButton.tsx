

type ToggleButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

function ToggleButton({
  label,
  isSelected,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",          // 텍스트 크기에 맞게
        alignItems: "center",             // 세로 중앙 정렬
        padding: "2px 8px",               // 최소 패딩 (세로 사이즈 최소화)
        lineHeight: "1.2",                // 텍스트 기준 높이
        fontSize: "16px",
        fontWeight: 600,
        borderRadius: 6,
        border: "1px solid #d1d5db",
        cursor: "pointer",
        whiteSpace: "nowrap",             // 줄바꿈 방지
        backgroundColor: isSelected ? "#2563eb" : "#ffffff",
        color: isSelected ? "#ffffff" : "#000000",
      }}
    >
      {label}
    </button>
  );
}

export default ToggleButton;