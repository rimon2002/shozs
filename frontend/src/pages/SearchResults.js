import React from "react";
import "./SearchResults.css";
import { useLocation, useNavigate } from "react-router-dom";
import busData from "../data/busSearchResults.json";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  const exactMatches = busData.filter(
    (bus) =>
      bus.departCity.toLowerCase() === from?.toLowerCase() &&
      bus.arrivalCity.toLowerCase() === to?.toLowerCase() &&
      bus.departDate === date
  );

  const otherMatches = busData.filter(
    (bus) =>
      bus.departCity.toLowerCase() === from?.toLowerCase() &&
      bus.arrivalCity.toLowerCase() === to?.toLowerCase() &&
      bus.departDate !== date
  );

  const renderBusCard = (bus) => (
    <div className="result-card shadow-sm p-3 rounded mb-4" key={bus.id}>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="bus-details">
          <h5 className="text-success fw-bold">{bus.company}</h5>
          <p className="mb-1">{bus.type}</p>
          <p className="text-muted small">Route: {bus.route}</p>
        </div>
        <div className="time-info text-center">
          <h6 className="fw-bold">{bus.departTime}</h6>
          <p className="mb-1 small">{bus.departDate}</p>
          <p className="small text-muted">{bus.departCity}</p>
        </div>
        <div className="duration text-center">
          <p className="text-warning fw-bold">~5-8h</p>
        </div>
        <div className="time-info text-center">
          <h6 className="fw-bold">{bus.arrivalTime}</h6>
          <p className="mb-1 small">{bus.arrivalDate}</p>
          <p className="small text-muted">{bus.arrivalCity}</p>
        </div>
        <div className="price-info text-center">
          <h5 className="fw-bold text-dark">৳{bus.price}</h5>
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              const isLoggedIn = localStorage.getItem("user");
              if (!isLoggedIn) {
                navigate("/login", {
                  state: { from: { pathname: "/seats", bus } },
                });
              } else {
                navigate("/seats", { state: { bus } });
              }
            }}
          >
            BOOK TICKET
          </button>
          <p className="small text-muted mt-1">{bus.seats} Seat(s) Available</p>
        </div>
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2">
        <span className="badge bg-light text-success border">
          Cancellation Policy
        </span>
        <span className="badge bg-light text-success border">
          Boarding Point
        </span>
        <span className="badge bg-light text-success border">
          Dropping Point
        </span>
        <span className="badge bg-light text-success border">Amenities</span>
      </div>
    </div>
  );

  return (
    <div className="results-page container mt-5">
      <h4 className="text-center text-success mb-4">
        {from} → {to} on {date}
      </h4>

      {exactMatches.length > 0 ? (
        <>
          <h5 className="mb-3">Available Buses:</h5>
          {exactMatches.map(renderBusCard)}
        </>
      ) : (
        <>
          <p className="text-center text-muted">
            No buses found for this date. Showing other available options:
          </p>
          {otherMatches.length > 0 ? (
            <>
              <h5 className="text-success my-3 text-center">
                Other Dates Available
              </h5>
              {otherMatches.map(renderBusCard)}
            </>
          ) : (
            <p className="text-center text-danger">
              No buses found on any date.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults;
