import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const seatLayout = [
  ["A1", "A2", "A3", "A4"],
  ["B1", "B2", "B3", "B4"],
  ["C1", "C2", "C3", "C4"],
  ["D1", "D2", "D3", "D4"],
  ["E1", "E2", "E3", "E4"],
  ["F1", "F2", "F3", "F4"],
  ["G1", "G2", "G3", "G4"],
];

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      alert("You must be logged in to book tickets.");
      navigate("/login", {
        state: { from: { pathname: "/seats", bus } },
      });
    }

    const stored =
      JSON.parse(localStorage.getItem(`bookedSeats_${bus?.id}`)) || [];
    setBookedSeats(stored);
  }, [bus, navigate]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 4) {
        alert("You can select a maximum of 4 seats.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    const updated = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`bookedSeats_${bus.id}`, JSON.stringify(updated));

    const ticketNumber = `${bus.id}-${selectedSeats.join("-")}`;
    const totalAmount = selectedSeats.length * bus.price;

    navigate("/booking-success", {
      state: {
        ticketNumber,
        amount: totalAmount,
        seats: selectedSeats,
        bus,
      },
    });
  };

  if (!bus)
    return (
      <p className="text-center mt-5 text-danger">Invalid bus selection</p>
    );

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h3 className="text-success">{bus.company}</h3>
        <p className="mb-2">
          <strong>Route:</strong> {bus.departCity} → {bus.arrivalCity}
        </p>
        <p className="mb-3">
          <strong>Date:</strong> {bus.departDate} | <strong>Coach No.:</strong>{" "}
          #{bus.id}
        </p>

        <div className="seat-grid mb-4">
          {seatLayout.map((row, i) => (
            <div key={i} className="seat-row">
              {row.map((seat) => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                return (
                  <button
                    key={seat}
                    className={`seat btn btn-sm me-1 mb-1 ${
                      isBooked
                        ? "btn-secondary"
                        : isSelected
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => toggleSeat(seat)}
                    disabled={isBooked}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">
            <strong>{selectedSeats.length}</strong> seat(s) selected – Total:{" "}
            <strong>৳{selectedSeats.length * bus.price}</strong>
          </p>
          <button
            className="btn btn-primary"
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
