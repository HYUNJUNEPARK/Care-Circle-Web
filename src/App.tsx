import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './constants/paths';
import Login from './pages/signin/Login';
import Main from './pages/main/Main';
import Init from './pages/init/Init';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';
import NotActive from './pages/notactive/NotActive';
import DashBoardMain from './pages/dashboard/contents/DashBoardMain';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path={PATH.ROOT} element={<Init />} />
        <Route path={PATH.SIGN_IN} element={<Login />} />
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.NOT_ACTIVE} element={<NotActive />} />
        <Route path={PATH.DASH_BOARD} element={<DashBoardMain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
