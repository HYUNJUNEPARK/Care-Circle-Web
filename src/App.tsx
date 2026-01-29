import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './constants/paths';
import SignIn from './pages/signin/SignIn';
import Main from './pages/app/main/Main';
import Init from './pages/init/Init';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';
import NotActive from './pages/notactive/NotActive';
import DashBoard from './pages/dashboard/DashBoard';
import HealthItemList from './pages/app/health-item/list/HealthItemList';
import HealthItemEditor from './pages/app/health-item/editor/HealthItemEditor';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path={PATH.ROOT} element={<Init />} />
        <Route path={PATH.SIGN_IN} element={<SignIn />} />
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.NOT_ACTIVE} element={<NotActive />} />
        <Route path={PATH.DASH_BOARD} element={<DashBoard />} />
        <Route path={PATH.MY_SUPPLEMENTS} element={<HealthItemList />} />
        <Route path={PATH.MANAGE_SUPPLEMENTS} element={<HealthItemEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
