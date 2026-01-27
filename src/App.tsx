import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './constants/paths';
import SignIn from './pages/signin/SignIn';
import Main from './pages/app/main/Main';
import Init from './pages/init/Init';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';
import NotActive from './pages/notactive/NotActive';
import DashBoard from './pages/dashboard/DashBoard';
import SupplementList from './pages/app/supplement/list/SupplementList';
import SupplementEditor from './pages/app/supplement/editor/SupplementEditor';

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
        <Route path={PATH.MY_SUPPLEMENTS} element={<SupplementList />} />
        <Route path={PATH.MANAGE_SUPPLEMENTS} element={<SupplementEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
