
import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication';
import axios from 'axios';
// import Dashboard from './routes/dashboard/Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    console.log(setIsLoggedIn);

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/auth/',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then((response) => {

        setUserUsername(response.data.username);
        setIsLoggedIn(true);
      })
      .catch((error) => {

        console.log(error);
      });
    }
  }, []);

  return (
    <div className={`App ${isLoggedIn ? 'dashboard-view' : 'auth-view'}`}>
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  );
}

export default App;