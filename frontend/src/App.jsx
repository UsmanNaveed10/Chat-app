import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes> 
    </div>
  );
}

export default App;
