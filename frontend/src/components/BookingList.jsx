import React from "react";
import {
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import BookingForm from "./BookingForm";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const BookingList = ({
  bookings,
  loading,
  error,
  onRefresh,
  onCreateBooking,
  isAdmin = false,
}) => {
  const [editingBooking, setEditingBooking] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setOpenEditDialog(true);
  };

  const handleCreateClick = () => {
    setEditingBooking(null);
    setOpenCreateDialog(true);
  };

  const handleDeleteClick = async (bookingId) => {
    try {
      await onCreateBooking(null, bookingId, true);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingBooking) {
        await onCreateBooking(formData, editingBooking.id);
      } else {
        await onCreateBooking(formData);
      }
      setOpenEditDialog(false);
      setOpenCreateDialog(false);
      onRefresh();
    } catch (error) {
      console.error("Failed to save booking:", error);
      throw error;
    }
  };

  if (loading && !bookings?.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && !bookings?.length) {
    return (
      <Alert
        severity="error"
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={onRefresh}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {isAdmin && (
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Bookings" />
            <Tab label="Statistics" />
          </Tabs>
        </Box>
      )}

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateClick}
          sx={{ mb: 2 }}
        >
          New Booking
        </Button>
      </Box>

      {bookings?.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No Bookings Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {isAdmin
              ? "There are no bookings in the system yet."
              : "You don't have any bookings yet. Create your first booking now!"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClick}
          >
            Create Booking
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="bookings table">
              <TableHead>
                <TableRow>
                  {isAdmin && <TableCell>User</TableCell>}
                  <TableCell>Service</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {isAdmin && (
                      <TableCell>
                        {booking.user?.username || "System"}
                      </TableCell>
                    )}
                    <TableCell>{booking.service?.name || "N/A"}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{formatDate(booking.dateTime)}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      {booking.address}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleEditClick(booking)}
                        aria-label="edit"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(booking.id)}
                        aria-label="delete"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress size={24} />
            </Box>
          )}
        </>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingBooking ? "Edit Booking" : "Create Booking"}
        </DialogTitle>
        <DialogContent dividers>
          <BookingForm
            initialData={editingBooking}
            onSubmit={handleSubmit}
            onCancel={() => setOpenEditDialog(false)}
            isAdmin={isAdmin}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookingList;
