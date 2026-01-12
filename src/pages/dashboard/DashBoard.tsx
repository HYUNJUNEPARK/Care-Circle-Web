import { useState } from 'react';
import Toolbar from './components/toolbar/Toolbar';
import Sidebar from './components/sidebar/Sidebar';
import Content from './contents/Content';
import type { SideMenuItem } from '../../types/SideMenuItem';
import { TbLayoutDashboard } from "react-icons/tb";
import { IoBarChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { FaPills } from "react-icons/fa6";

export default function DashBoard() {
    const [selectedMenu, setSelectedMenu] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const sideMenuItems: SideMenuItem[] = [
        { id: 'dashboard', label: '대시보드 템플릿', icon: <TbLayoutDashboard size={20} /> },
        { id: 'users', label: '사용자 관리', icon: <LuUserRound size={20} /> },
        { id: 'supplements', label: '영양제 목록', icon: <FaPills size={20} /> },
        { id: 'analytics', label: '통계 템플릿', icon: <IoBarChartOutline size={20} /> },
        { id: 'reports', label: '리포트 템플릿', icon: <FiFileText size={20} /> },
        { id: 'settings', label: '설정 템플릿', icon: <IoSettingsOutline size={20} /> },
    ];

    return (
        <div style={{
            backgroundColor: '#f3f4f6',
            width: "100vw",
            minHeight: "100vh"
        }}>
            <Toolbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div style={{ display: 'flex' }}>
                <Sidebar
                    menuItems={sideMenuItems}
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    sidebarOpen={sidebarOpen} />

                <div style={{
                    flex: "1",
                    padding: "1.5rem",
                    overflow: "auto"
                }}>
                    <Content selectedMenu={selectedMenu} />
                </div>
            </div>
        </div>
    );
};