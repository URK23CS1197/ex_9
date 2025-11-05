import { useState } from 'react';
import axios from 'axios';

function Registration({ onLoginSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/register', {
        fullName, email, username, password
      });
      setMessage(res.data.status);
      // Optional: Auto-login after registration
      if (res.data.status === 'Registration successful' && typeof onLoginSuccess === 'function') {
        onLoginSuccess();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5" style={{ minHeight: '70vh' }}>
      <div className="w-100" style={{ maxWidth: 450 }}>
        <div className="card shadow rounded-4 p-4">
          <h3 className="mb-4 text-center">User Registration</h3>
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">Register</button>
          </form>
          {message && <div className="alert alert-info text-center mt-3">{message}</div>}
        </div>
      </div>
    </main>
  );
}

export default Registration;
