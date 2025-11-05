// In your React component (e.g., src/components/AuthForm.js)
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust path if firebaseConfig.js is elsewhere

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      // Redirect or update UI
    } catch (err) {
      setError(err.message);
      console.error("Sign up error:", err.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      // Redirect or update UI
    } catch (err) {
      setError(err.message);
      console.error("Sign in error:", err.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <button type="submit" onClick={handleSignIn}>Sign In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AuthForm;
