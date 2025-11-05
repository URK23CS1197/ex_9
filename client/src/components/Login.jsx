import { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/login', { usernameOrEmail, password });
      setMessage(res.data.status);
      if (res.data.status === 'Login successful') {
        onLoginSuccess(); // Signal to App.jsx
      }
    } catch (err) {
      setMessage(err.response?.data?.status || "Login failed");
    }
  };

  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5" style={{ minHeight: '70vh' }}>
      <div className="w-100" style={{ maxWidth: 450 }}>
        <div className="card shadow rounded-4 p-4">
          <h3 className="mb-4 text-center">User Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Username or Email" value={usernameOrEmail} required onChange={e => setUsernameOrEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
          </form>
          {message && <div className="alert alert-info text-center mt-3">{message}</div>}
        </div>
      </div>
    </main>
  );
}

export default Login;
