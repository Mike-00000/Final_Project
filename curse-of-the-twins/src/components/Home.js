import React, { useState } from 'react';
import Introduction from './Introduction'; 

const Home = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [isNewGame, setNewGame] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Initialisation à true
  const [showIntroduction, setShowIntroduction] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
  
      if (response.status == 200) {
        console.log(response);
        setIsAuthenticated(false);
      } else {
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
          email: registerEmail,
        }),
      });
  
      if (response.ok) {
        setIsAuthenticated(true); // Met à jour l'état d'authentification pour afficher les boutons "New Game" et "Continue"
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNewGame = () => {
    setShowIntroduction(true);
  };  
  

  return (
    <div>
      <h1>The Curse of the Twins</h1>
      {isAuthenticated ? (
        <>
          {showIntroduction ? (
            <Introduction />
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <label>
                  Username:
                  <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                </label>
                <label>
                  Password:
                  <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
              </form>
              <form onSubmit={handleRegister}>
                <label>
                  Username:
                  <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
                </label>
                <label>
                  Password:
                  <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                </label>
                <label>
                  Email:
                  <input type="text" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                </label>
                <button type="submit">Register</button>
              </form>
              <button onClick={handleNewGame}>New Game</button>
              <button onClick={() => setNewGame(false)}>Continue</button>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={() => setNewGame(true)}>New Game</button>
          <button onClick={() => setNewGame(false)}>Continue</button>
        </>
      )}
    </div>
  );
}

export default Home;
