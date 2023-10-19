import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate();

  const handleFirstnameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    const registrationData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setRegistrationStatus('success');

        // Redirect to the login page after successful registration
        setTimeout(() => {
          navigate('/chat');
        }, 10000);
      } else {
        setRegistrationStatus('failed');
        console.log('Registration failed');
      }
    } catch (error) {
      setRegistrationStatus('failed');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-container__heading">Register</h2>
      <form className="registration-form" onSubmit={handleRegistration}>
        {registrationStatus === 'success' && (
          <p className="registration-success-message">Registration Successful</p>
        )}
        {registrationStatus === 'success' && (
          <p className="registration-success-message">Redirecting in 10 seconds...</p>
        )}
        {registrationStatus === 'failed' && (
          <p className="registration-failed-message">Registration Failed</p>
        )}

        <div className="registration-form__group">
          <label htmlFor="firstName" className="registration-form__label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstname}
            onChange={handleFirstnameChange}
            className="registration-form__input"
          />
        </div>
        <div className="registration-form__group">
          <label htmlFor="lastName" className="registration-form__label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={handleLastnameChange}
            className="registration-form__input"
          />
        </div>
        <div className="registration-form__group">
          <label htmlFor="username" className="registration-form__label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="registration-form__input"
          />
        </div>
        <div className="registration-form__group">
          <label htmlFor="email" className="registration-form__label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="registration-form__input"
          />
        </div>
        <div className="registration-form__group">
          <label htmlFor="password" className="registration-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="registration-form__input"
          />
        </div>
        <button type="submit" className="registration-form__button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;