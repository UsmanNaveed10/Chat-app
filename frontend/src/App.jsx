import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {

  const {authUser}=useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path='/home' element={authUser ? <Home/> : <Navigate to = {"/login"}/>} />
        <Route path='/login' element={authUser ? <Navigate to='/home' /> : <Login />} />
        <Route path='/signup'  element={authUser ? <Navigate to='/home' /> : <SignUp />}/>
        
        
      </Routes> 
      <Toaster/>
      
    </div>
  );
}

export default App;
