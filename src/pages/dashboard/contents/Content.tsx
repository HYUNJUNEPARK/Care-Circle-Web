// import UsersContent from './UserContent';
import UsersContent from '../UserContent';
import ProductsContent from './ProductsContent';
import ReportsContent from './ReportsContent';
import AnalyticsContent from './AnalyticsContent';
import SettingsContent from './SettingsContent';
import DashboardContent from './DashboardContent';

function Content({ selectedMenu }: { selectedMenu: string }) {
    switch (selectedMenu) {
        case 'dashboard': return <DashboardContent />;
        case 'users': return <UsersContent />;
        case 'products': return <ProductsContent />;
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