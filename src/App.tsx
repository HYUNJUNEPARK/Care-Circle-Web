import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './constants/paths';
import Login from './pages/signin/Login';
import Main from './pages/main/Main';
import Init from './pages/init/Init';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';
import NotActive from './pages/notactive/NotActive';
import Admin from './pages/admin/Admin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.ROOT} element={<Init />} />
        <Route path={PATH.SIGN_IN} element={<Login />} />
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.NOT_ACTIVE} element={<NotActive />} />
        <Route path={PATH.ADMIN} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
