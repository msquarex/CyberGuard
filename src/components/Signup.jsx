import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'; // Import the auth styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setSuccess('Signup successful! Please verify your email.');
      setShowPopup(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Signup</h2>
        <p>Create your account</p>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="auth-form" onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Signup successful! Please verify your email.</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
