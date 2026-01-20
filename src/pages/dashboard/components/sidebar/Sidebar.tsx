import styles from './Sidebar.module.css';
import type { SideMenuItem } from '../../../../types/local/SideMenuItem';

function Sidebar({
    selectedMenu,
    menuItems,
    setSelectedMenu,
    sidebarOpen
}: {
    selectedMenu: string,
    menuItems: SideMenuItem[],
    setSelectedMenu: (id: string) => void,
    sidebarOpen: boolean
}) {
    return (
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
            <div style={{ padding: '1rem' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedMenu(item.id)}
                            className={`${styles.button} ${(selectedMenu === item.id) ? styles.selected : ''}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;