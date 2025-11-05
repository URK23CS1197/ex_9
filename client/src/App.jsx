import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import LaptopCatalog from './components/LaptopCatalog';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  // Handles after successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Handles registration navigation
  const handleShowRegister = () => setShowRegistration(true);
  const handleShowLogin = () => setShowRegistration(false);

  return (
    <div>
      <header className="bg-primary text-white text-center py-4 shadow-sm">
        <h1 className="display-4 fw-bold mb-2">Laptop Catalog</h1>
        <p className="lead mb-0">Manage your laptop inventory with ease</p>
      </header>
      {!isLoggedIn ? (
        <div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-light m-2" onClick={handleShowLogin}>Login</button>
            <button className="btn btn-light m-2" onClick={handleShowRegister}>Register</button>
          </div>
          {showRegistration 
            ? <Registration onLoginSuccess={handleLoginSuccess} /> 
            : <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
      ) : (
        <LaptopCatalog />
      )}
      <footer className="bg-dark text-white text-center py-3 shadow-sm mt-auto">
        <p className="mb-0">&copy; 2025 Laptop Catalog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
