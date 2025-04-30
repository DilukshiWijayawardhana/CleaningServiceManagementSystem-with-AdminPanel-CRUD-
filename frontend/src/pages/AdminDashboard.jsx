import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
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
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [newService, setNewService] = useState("");

  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/bookings/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings");
      console.error(err);
    }
  };

  const fetchAllServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/services");
      setServices(response.data);
    } catch (err) {
      setError("Failed to fetch services");
      console.error(err);
    }
  };

  const handleCreateService = async () => {
    setLoading(true);
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
      setNewService("");
      setOpenServiceDialog(false);
      fetchAllServices();
    } catch (err) {
      setError("Failed to create service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    fetchAllServices();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Bookings" />
          <Tab label="Services" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            All Bookings
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.address}</TableCell>
                    <TableCell>
                      {new Date(booking.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{booking.service?.name}</TableCell>
                    <TableCell>{booking.user?.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">Services</Typography>
            <Button
              variant="contained"
              onClick={() => setOpenServiceDialog(true)}
            >
              Add Service
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>
                      {service.is_active ? "Active" : "Inactive"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Dialog
        open={openServiceDialog}
        onClose={() => setOpenServiceDialog(false)}
      >
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            label="Service Name"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenServiceDialog(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateService}
              disabled={loading || !newService.trim()}
            >
              {loading ? <CircularProgress size={24} /> : "Create"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
