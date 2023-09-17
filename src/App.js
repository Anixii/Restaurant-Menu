import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminForm from './components/adminPanel/AdminForm';
import { Upload } from 'antd'; 
import { storage } from './firebaseConfig'; 
import { ref, uploadBytes, } from 'firebase/storage';
import { useState } from 'react'; 
import WithAdminAuth from './hoc/WithAdminAuth';
import AdminPage from './components/adminPanel/AdminPage';
import MainPage from './components/MainPage';
import MenuPage from './components/menuPage/MenuPage';
import DefineMenu from './components/menuPage/defineMenuList/DefineMenu';
function App() {  
  const [data,setData] = useState([])
  const onUploadChange = ({fileList}) =>{  
    // console.log(e.target.files[0]); 
    // console.log(e.target.files); 
    console.log(fileList); 
    setData(fileList) 

  }
  const onHandleSave = async() =>{ 
    try {
      const photomouseRef = ref(storage, 'photomouse'); // Замените на вашу коллекцию
  
      const promises = data.map(async (file) => {
        const fileRef = ref(photomouseRef, file.name);
        await uploadBytes(fileRef, file.originFileObj);
      });
  
      await Promise.all(promises);
    } catch (error) {
console.log(error);
    }
  }
  return (
    <>   
    {/* hello  
    <Upload
      onChange={(e) => onUploadChange(e)}
      listType="picture" 
      fileList={data}
      maxCount={3}
      multiple
    >Upload</Upload> 
    <button onClick={onHandleSave}>Save</button>  */}
    {/* <input multiple onChange={onUploadChange} type='file'/> */}
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
