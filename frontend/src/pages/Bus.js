
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bus() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  const searchBus = async () => {
    const res = await axios.get('http://localhost:5000/api/bus/search', {
      params: { from, to, date }
    });
    setResults(res.data);
  };

  return (
    <div className="container mt-5">
      <h2>Bus Ticket Search</h2>
      <div className="row mb-3">
        <div className="col">
          <input className="form-control" placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" onClick={searchBus}>Search</button>
        </div>
      </div>
      <ul className="list-group">
        {results.map((bus, index) => (
          <li key={index} className="list-group-item">
            <strong>{bus.name}</strong> - {bus.time} - <span className="text-success">{bus.price} BDT</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bus;
