import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Alert,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookingList from "../components/BookingList";
import {
  getBookings,
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../api/booking";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = isAdmin ? await getAllBookings() : await getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [isAdmin]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBookingAction = async (formData, bookingId, isDelete = false) => {
    try {
      setLoading(true);
      if (isDelete) {
        await deleteBooking(bookingId);
      } else if (bookingId) {
        await updateBooking(bookingId, formData);
      } else {
        await createBooking(formData);
      }
      await fetchBookings();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (isDelete
            ? "Failed to delete booking"
            : bookingId
            ? "Failed to update booking"
            : "Failed to create booking")
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading && !bookings.length) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error && !bookings.length) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={fetchBookings}>
              Retry
            </Button>
          }
        >
          <Typography variant="body1">{error}</Typography>
          {error.includes("token") && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your session might have expired. Try logging in again.
            </Typography>
          )}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          {isAdmin ? "Bookings Management" : "My Bookings"}
        </Typography>
        {/* Removed the New Booking button from here */}
        {isAdmin && tabValue === 1 && (
          <Button variant="outlined" onClick={() => navigate("/admin/reports")}>
            Generate Report
          </Button>
        )}
      </Box>

      {isAdmin && (
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Bookings" />
            <Tab label="Statistics" />
            <Tab label="Calendar View" />
          </Tabs>
        </Box>
      )}

      {tabValue === 0 && (
        <BookingList
          bookings={bookings}
          loading={loading}
          error={error}
          onRefresh={fetchBookings}
          onCreateBooking={handleBookingAction}
          isAdmin={isAdmin}
        />
      )}

      {isAdmin && tabValue === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Booking Statistics
          </Typography>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1">
              Statistics dashboard will be implemented here
            </Typography>
          </Paper>
        </Box>
      )}

      {isAdmin && tabValue === 2 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Calendar View
          </Typography>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", minHeight: "400px" }}
          >
            <Typography variant="body1">
              Calendar view of bookings will be implemented here
            </Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
