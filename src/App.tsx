import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './constants/paths';
import Login from './pages/login/Login';
import Main from './pages/main/Main';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.MAIN} element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
