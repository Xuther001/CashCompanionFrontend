import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
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

    // Create an object to hold the registration data
    const registrationData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
    };

    try {
      // Send the registration data to the backend for registration
      const response = await fetch('http://35.91.130.145:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      // Check if the response is successful
      if (response.ok) {
        setRegistrationStatus('success'); // Set registrationStatus to 'success' on success
        // Redirect to the login page after successful registration
      } else {
        setRegistrationStatus('failed'); // Set registrationStatus to 'failed' on failure
        console.log('Registration failed');
        // Handle registration failure, display an error message, etc.
      }
    } catch (error) {
      setRegistrationStatus('failed'); // Set registrationStatus to 'failed' on error
      console.error('Error during registration:', error);
      // Handle errors like network issues, server errors, etc.
    }

    setTimeout(() => {
        navigate('/');
      }, 10000);
  };

  return (
    <div className="registration-container">
      <h2 className="registration-container__heading">Register</h2>
      <form className="registration-form" onSubmit={handleRegistration}>
        {/* Conditional rendering of registration status message */}
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
            value={firstName}
            onChange={handleFirstNameChange}
            className="registration-form__input"
          />
        </div>
        <div className="registration-form__group">
          <label htmlFor="lastName" className="registration-form__label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
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