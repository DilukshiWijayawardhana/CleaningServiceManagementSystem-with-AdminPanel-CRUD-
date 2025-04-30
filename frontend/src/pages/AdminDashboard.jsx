import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { getBookings, deleteBooking } from "../api/booking";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [newService, setNewService] = useState("");

  const fetchAllData = async () => {
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        axios.get("http://localhost:4000/api/bookings/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get("http://localhost:4000/api/services"),
      ]);
      setBookings(bookingsRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);
      fetchAllData();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleCreateService = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/services",
        { name: newService },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOpenServiceDialog(false);
      setNewService("");
      fetchAllData();
    } catch (error) {
      console.error("Failed to create service:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="contained" onClick={() => setOpenServiceDialog(true)}>
          Create Service
        </Button>
      </Stack>

      <Typography variant="h5" sx={{ mb: 2 }}>
        All Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>
                  {new Date(booking.dateTime).toLocaleString()}
                </TableCell>
                <TableCell>{booking.service?.name}</TableCell>
                <TableCell>{booking.user?.username}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openServiceDialog}
        onClose={() => setOpenServiceDialog(false)}
      >
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ p: 2, minWidth: 300 }}>
            <TextField
              label="Service Name"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateService}>
              Create
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
