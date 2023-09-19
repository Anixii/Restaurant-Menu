import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminForm from './components/adminPanel/AdminForm'; 
import WithAdminAuth from './hoc/WithAdminAuth';
import AdminPage from './components/adminPanel/AdminPage';
import MainPage from './components/MainPage';
import MenuPage from './components/menuPage/MenuPage';
import DefineMenu from './components/menuPage/defineMenuList/DefineMenu';
function App() {  

  return (
    <>   
      <Routes>  
        <Route path='/' element={<MainPage/>}/> 
        <Route path='/menu/' element={<MenuPage/>}/>
        <Route path='/menu/:id' element={<DefineMenu/>}/>
        <Route path='/admin' element={<AdminForm/>}/>
        <Route path='/add' element={<WithAdminAuth> <AdminPage/></WithAdminAuth>}/>
      </Routes>
    </>
  );
}

export default App;
