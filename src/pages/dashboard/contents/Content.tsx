import UsersContent from './user/UserContent';
import SupplementContent from './supplements/SupplementContent';
import ReportsContent from './report/ReportsContent';
import AnalyticsContent from './analytics/AnalyticsContent';
import SettingsContent from './settings/SettingsContent';
import DashboardContent from './dashboard/DashboardContent';

function Content({ selectedMenu }: { selectedMenu: string }) {
    switch (selectedMenu) {
        case 'dashboard': return <DashboardContent />;
        case 'users': return <UsersContent />;
        case 'supplements': return <SupplementContent />;
        case 'analytics': return <AnalyticsContent />;
        case 'reports': return <ReportsContent />;
        case 'settings': return <SettingsContent />;
        default:
            return (
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>
                        페이지를 찾을 수 없습니다
                    </h1>
                </div>
            );
    }
}
export default Content; 