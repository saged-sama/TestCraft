import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Auth/Auth.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <div className="link-container">
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
