import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const cities = [
  { value: "Rajshahi", label: "Rajshahi" },
  { value: "Mohadevpur", label: "Mohadevpur" },
  { value: "Nozipur", label: "Nozipur" },
  { value: "Sapahar", label: "Sapahar" },
  { value: "Damoirhat", label: "Damoirhat" },
  { value: "Joypurhat", label: "Joypurhat" },
  { value: "Panchbibi", label: "Panchbibi" },
  { value: "Hili", label: "Hili" },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    fontSize: "16px",
    borderColor: "#ced4da",
    boxShadow: "none",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#495057",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#212529",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "#212529",
    backgroundColor: state.isSelected
      ? "#198754"
      : state.isFocused
      ? "#e9ecef"
      : "white",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

function Home() {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (fromCity && toCity && date) {
      navigate("/results", {
        state: {
          from: fromCity.label,
          to: toCity.label,
          date,
        },
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
        <a className="navbar-brand fw-bold fs-4 text-success" href="#">
          <i className="fas fa-bus-alt me-2"></i>TripSetGo
        </a>
        <div className="ms-auto d-flex align-items-center">
          <a href="/login" className="btn btn-outline-success me-2">
            Login
          </a>
          <a href="/signup" className="btn btn-success">
            Sign Up
          </a>
        </div>
      </nav>

      <div className="hero-section text-white d-flex align-items-center justify-content-center">
        <div className="search-box bg-white p-4 rounded shadow-lg">
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label fw-semibold">From</label>
              <Select
                options={cities}
                placeholder="Select departure city"
                value={fromCity}
                onChange={setFromCity}
                styles={selectStyles}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">To</label>
              <Select
                options={cities}
                placeholder="Select destination city"
                value={toCity}
                onChange={setToCity}
                styles={selectStyles}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Journey Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-md-1 d-grid">
              <label className="form-label d-block invisible">Search</label>
              <button className="btn btn-success" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center my-5">
        <h2>
          <span className="text-success">Buy tickets</span> in 3 easy steps
        </h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <h5>🔍 Search</h5>
            <p>
              Choose your origin, destination, journey dates and search for
              buses
            </p>
          </div>
          <div className="col-md-4">
            <h5>🪑 Select</h5>
            <p>Select your desired trip and choose your seats</p>
          </div>
          <div className="col-md-4">
            <h5>💳 Pay</h5>
            <p>Pay by bank cards or mobile banking</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
