import React, { useEffect, useState } from "react";
import {
  getBookings,
  deleteBooking,
  updateBooking,
  createBooking,
} from "../api/booking";
import {
  Button,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import BookingForm from "./BookingForm";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setOpenEditDialog(true);
  };

  const handleCreateClick = () => {
    setEditingBooking(null);
    setOpenCreateDialog(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingBooking) {
        await updateBooking(editingBooking.id, formData);
      } else {
        await createBooking(formData);
      }
      fetchBookings();
      setOpenEditDialog(false);
      setOpenCreateDialog(false);
    } catch (error) {
      console.error("Failed to save booking:", error);
      throw error; // This will be caught by BookingForm's error handling
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Your Bookings</Typography>
        <Button variant="contained" onClick={handleCreateClick}>
          Create New Booking
        </Button>
      </Stack>

      {bookings.map((booking) => (
        <Paper key={booking.id} sx={{ padding: 2 }}>
          <Typography>Customer: {booking.customerName}</Typography>
          <Typography>Address: {booking.address}</Typography>
          <Typography>
            Date & Time: {new Date(booking.dateTime).toLocaleString()}
          </Typography>
          <Typography>Service: {booking.service?.name}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Button variant="outlined" onClick={() => handleEditClick(booking)}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(booking.id)}
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          {editingBooking && (
            <BookingForm
              initialData={editingBooking}
              onSubmit={handleSubmit}
              onSuccess={() => setOpenEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Booking</DialogTitle>
        <DialogContent>
          <BookingForm
            onSubmit={handleSubmit}
            onSuccess={() => setOpenCreateDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default BookingList;
