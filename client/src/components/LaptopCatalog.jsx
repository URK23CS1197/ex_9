import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'https://ex-9-p2cs.onrender.com';

function LaptopCatalog() {
  const [laptops, setLaptops] = useState([]);
  const [message, setMessage] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');

  const loadLaptops = () => {
    axios
      .get(`${API_BASE}/api/viewAll`)
      .then((res) => setLaptops(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLaptops();
  }, []);

  const addLaptop = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/api/addNew`, { brand, model, specs, price })
      .then((res) => {
        setMessage(res.data.status);
        loadLaptops();
        setBrand('');
        setModel('');
        setSpecs('');
        setPrice('');
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => console.log(err));
  };

  const deleteLaptop = (id) => {
    axios
      .post(`${API_BASE}/api/deleteUser`, { id })
      .then((res) => {
        setMessage(res.data.status);
        loadLaptops();
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5" style={{ minHeight: '70vh' }}>
      <div className="w-100" style={{ maxWidth: 450 }}>
        <div className="card shadow mb-5 rounded-4">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">Add New Laptop</h3>
            <form onSubmit={addLaptop}>
              <div className="mb-3">
                <input
                  className="form-control bg-white"
                  placeholder="Brand (e.g., Dell)"
                  value={brand}
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control bg-white"
                  placeholder="Model (e.g., XPS 13)"
                  value={model}
                  required
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control bg-white"
                  placeholder="Specifications (e.g., i7, 16GB RAM)"
                  value={specs}
                  required
                  onChange={(e) => setSpecs(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="form-control bg-white"
                  placeholder="Price (e.g., 999.99)"
                  type="number"
                  step="0.01"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100 py-2" type="submit">
                Add Laptop
              </button>
            </form>
          </div>
        </div>

        {message && (
          <div
            className="alert alert-success alert-dismissible fade show text-center"
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="card shadow rounded-4">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">Laptop List</h3>
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="table-light">ID</th>
                    <th scope="col" className="table-light">Brand</th>
                    <th scope="col" className="table-light">Model</th>
                    <th scope="col" className="table-light">Specifications</th>
                    <th scope="col" className="table-light">Price (Rs.)</th>
                    <th scope="col" className="table-light">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {laptops.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Laptops Available
                      </td>
                    </tr>
                  ) : (
                    laptops.map((laptop, index) => (
                      <tr key={laptop._id}>
                        <td>{index + 1}</td>
                        <td>{laptop.brand}</td>
                        <td>{laptop.model}</td>
                        <td>{laptop.specs}</td>
                        <td>{parseFloat(laptop.price).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteLaptop(laptop._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LaptopCatalog;
