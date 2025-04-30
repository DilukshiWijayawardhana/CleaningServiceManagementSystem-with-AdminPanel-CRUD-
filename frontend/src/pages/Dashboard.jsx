import React, { useState } from "react";
import { Container } from "@mui/material";
import BookingList from "../components/BookingList";
import { createBooking } from "../api/booking";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateBooking = async (formData) => {
    try {
      await createBooking(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Booking creation failed:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <BookingList onCreateBooking={handleCreateBooking} />
    </Container>
  );
};

export default Dashboard;
