import styles from './Dropdown.module.css';

function Dropdown({
    top, // 드롭다운이 버튼으로부터 떨어진 거리
    itemList, // 드롭다운 아이템 리스트
    onItemClick // 드롭다운 아이템 클릭 핸들러
}: {
    top: string,
    itemList: string[],
    onItemClick: (index: number) => void;
}) {
    return (
        <div
            className={styles.dropdown}
            style={{ top }}
        >
            {itemList?.map((item, index) => (
                <button
                    key={index}
                    className={styles.dropdownItem}
                    onClick={() => onItemClick(index)}>

                    {item}
                </button>
            ))}
        </div>
    );
}

export default Dropdown;