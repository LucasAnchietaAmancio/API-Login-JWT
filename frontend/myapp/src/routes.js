import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Cadastro from './Pages/Cadastro';
import Header from './Components/Header';
export default function AppRoute() {
  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
