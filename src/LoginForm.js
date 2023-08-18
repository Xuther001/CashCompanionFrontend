import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
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
  
    // Create an object to hold the credentials
    const credentials = {
      username: username,
      password: password,
    };
  
    try {
      // Send the credentials to the backend for authentication
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        console.log('Authentication successful:', data);
        // Save the authentication token to localStorage
        localStorage.setItem('authToken', data.token);
        // You might want to perform further actions like redirecting the user or updating the UI
        navigate('/chat'); // Use navigate
      } else {
        console.log('Authentication failed');
        // Handle authentication failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle errors like network issues, server errors, etc.
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;