import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import './App.css';
import Login from './component/login';
import Home from './component/Home';
import { Grid } from '@mui/material';   
import { Routes, Route, Navigate } from 'react-router-dom';
 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('isLoggedIn');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);  
    localStorage.setItem('isLoggedIn', 'true');  
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');  
  };

  return (
    <>
      <Grid container spacing={1} flexDirection={"column"}>
        <Grid container spacing={1} sx={{ height: "50px", alignItems: 'center' }}>
          {isLoggedIn ? '' : <Header />}
        </Grid>
      </Grid>

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : 
            <div className="container">
              <div className='login'>
                <Login onLogin={handleLogin} />
              </div>
            </div>
          }
        />
 
        <Route 
          path="/home" 
          element={
            isLoggedIn ? (
              <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Grid item> 
                  <Home onLogout={handleLogout} /> 
                </Grid>
              </Grid>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </>
  );
}
export default App;
