import React from "react";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import { createBooking } from "../api/booking";

const CreateBooking = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createBooking(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Booking creation failed:", error);
      throw error; // This will be caught by BookingForm's error handling
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Booking
        </Typography>
        <BookingForm onSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
};

export default CreateBooking;
