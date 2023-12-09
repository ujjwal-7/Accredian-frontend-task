import React, { useState } from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  const [user, setUser] = useState(null);

  return (
    
      <Routes>
        <Route path='/' element={user ? <Home user={user}/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
  
    
  );
}

export default App;
