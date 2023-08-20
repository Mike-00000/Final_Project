import React, { useState } from 'react';
import './home.css';
import Introduction from './Introduction'; 
import couverture from '../images/couverture.jpg';
import arabesque from "../images/arabesque.png";
import background from "../images/cabane.jpg";



const Home = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [isNewGame, setNewGame] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Initialisation à true
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
  
      if (response.status === 200) {
        setIsAuthenticated(true);
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
        setIsAuthenticated(true);
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    console.log("Logout function called");
    setIsAuthenticated(false);
    // Autres actions de déconnexion que vous pourriez avoir, comme vider les données utilisateur, etc.
  };

  const handleNewGame = () => {
    setShowIntroduction(true);
  };  
  

//   return (
//     <div>
//       <h1>The Curse of the Twins</h1>
//       {isAuthenticated ? (
//         <>
//           {showIntroduction ? (
//             <Introduction />
//           ) : (
//             <>
              // <form onSubmit={handleLogin}>
              //   <label>
              //     Username:
              //     <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
              //   </label>
              //   <label>
              //     Password:
              //     <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              //   </label>
              //   <button type="submit">Login</button>
              // </form>
              // <form onSubmit={handleRegister}>
              //   <label>
              //     Username:
              //     <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
              //   </label>
              //   <label>
              //     Password:
              //     <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
              //   </label>
              //   <label>
              //     Email:
              //     <input type="text" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
              //   </label>
              //   <button type="submit">Register</button>
              // </form>
//               <button onClick={handleNewGame}>New Game</button>
//               <button onClick={() => setNewGame(false)}>Continue</button>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <button onClick={() => setNewGame(true)}>New Game</button>
//           <button onClick={() => setNewGame(false)}>Continue</button>
//         </>
//       )}
//     </div>
//   );
// }

return (
  <div className={isAuthenticated ? 'authenticated' : 'not-authenticated'}>
    <div className="title-container">
      <div className="arabesque" style={{ backgroundImage: `url(${arabesque})` }} />
      <h1 className="title" >The Curse of Emma</h1>
      <div className="arabesque mirror" style={{ backgroundImage: `url(${arabesque})` }} />
    </div>
      
      
      {isAuthenticated ? (
          <>
              {showIntroduction ? (
                  <Introduction />
              ) : (
                <>
                  <div className="buttons-container">
                      <div className="button-box">
                          <button className='buttton' onClick={handleNewGame}>New Game</button>
                      </div>
                      <div className="button-box">
                          <button className='buttton' onClick={() => setNewGame(false)}>Continue</button>
                      </div>
                      <div className="button-box">
                          <button className='buttton' onClick={handleLogout}>Logout</button>
                      </div>
                  </div>

                  <div className="image-container">
                      <img src={couverture} alt="Original" />
                      <img src={couverture} alt="Mirror" className="mirror-image" />
                  </div>
                </>
              )}
          </>
      ) : (
          <>
              <div className="forms-container">
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
              </div>
          </>
      )}
  </div>
);


}

export default Home;