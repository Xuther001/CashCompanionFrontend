import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const credentials = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Authentication successful:', data);
        // Save the authentication token to localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', username); // Saving username
        navigate('/chat');
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-container__heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__group">
          <label htmlFor="username" className="login-form__label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="login-form__input"
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-form__input"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="login-form__button">Login</button>
          <div className="registration-button">
            <button type="button" className="login-form__button" onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;