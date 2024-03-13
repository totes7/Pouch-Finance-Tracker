import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../assets/styles/AccountAccess.css'
import Logo from './Logo';

function AccountAccess() {
  // State to manage which form to display
  const [showLoginForm, setShowLoginForm] = useState(true);

  // Function to toggle between login and sign up forms
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      {showLoginForm ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignUpForm toggleForm={toggleForm} />
      )}
    </div>
  );
}

// Login form component
function LoginForm({ toggleForm }) {
  return (
    <div className='form-container'>
      <Logo />
      {/* TODO: add onSubmit="" to form */}
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder='E.g. Steve Jobs' autoComplete="username" required/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder='************' autoComplete="current-password" required />
        <button type="submit">Login</button>
      </form>
      <button className="switch-form" onClick={toggleForm}>Not got an account?</button>
    </div>
  );
}

// Sign up form component
function SignUpForm({ toggleForm }) {
  return (
    <div className='form-container'>
     <Logo />
       {/* TODO: add onSubmit="" to form */}
      <form>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname" autoComplete="name" required />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" autoComplete="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="new-password" required  />
        <button type="submit">Sign Up</button>
      </form>
      <button className="switch-form" onClick={toggleForm}>Already have an account?</button>
    </div>
  );
}

export default AccountAccess;
