import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccess.css";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketNumber, amount, seats, bus } = location.state || {};

  if (!ticketNumber || !bus) {
    return (
      <div className="container text-center mt-5 text-danger">
        Invalid access.
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center success-page">
      <div className="card success-card shadow p-4">
        <div className="text-center mb-4">
          <i
            className="fas fa-check-circle text-success"
            style={{ fontSize: "4rem" }}
          ></i>
          <h2 className="text-success mt-3">Booking Confirmed!</h2>
        </div>

        <div className="mb-3">
          <h5 className="fw-bold">Ticket Details</h5>
          <p>
            <strong>Ticket Number:</strong> #{ticketNumber}
          </p>
          <p>
            <strong>Seats:</strong> {seats.join(", ")}
          </p>
          <p>
            <strong>Amount Paid:</strong> ৳{amount}
          </p>
          <p>
            <strong>Route:</strong> {bus.departCity} → {bus.arrivalCity} on{" "}
            {bus.departDate}
          </p>
        </div>

        <div className="text-center">
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
