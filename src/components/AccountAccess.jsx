import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Form.jsx";
import "../assets/styles/AccountAccess.css";
import Logo from "./Logo";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <Logo />
      {/* TODO: add onSubmit="" to form */}
      <form onSubmit={logIn}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="E.g. SteveJobs@email.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="************"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button className="switch-form" onClick={toggleForm}>
        Not got an account?
      </button>
    </div>
  );
}

// Sign up form component
function SignUpForm({ toggleForm }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail("");
        setPassword("");
        setFullName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <Logo />
      {/* TODO: add onSubmit="" to form */}
      <form onSubmit={signUp}>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <button className="switch-form" onClick={toggleForm}>
        Already have an account?
      </button>
    </div>
  );
}

export default AccountAccess;
