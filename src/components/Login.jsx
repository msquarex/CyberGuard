import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'; // Import the auth styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message); 
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Login</h2>
        <p>Access your account</p>
      </div>
      {error && <p className="error-message">{error}</p>} 
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>
    </div>
  );
};

export default Login; 