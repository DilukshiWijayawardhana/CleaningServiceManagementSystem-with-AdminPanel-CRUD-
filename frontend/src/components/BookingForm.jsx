import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

const BookingForm = ({ initialData, onSubmit, onSuccess }) => {
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    dateTime: "",
    serviceId: "",
  });
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Initialize form with initialData if it exists
    if (initialData) {
      const formattedDateTime = initialData.dateTime
        ? new Date(initialData.dateTime).toISOString().slice(0, 16)
        : "";
      setForm({
        customerName: initialData.customerName || "",
        address: initialData.address || "",
        dateTime: formattedDateTime,
        serviceId: initialData.serviceId || initialData.service?.id || "",
      });
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/services");
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services");
        console.error(err);
      }
    };
    fetchServices();
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.address ||
      !form.dateTime ||
      !form.serviceId
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onSubmit(form);
      setSuccess("Booking saved successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.response?.data?.message || "Failed to save booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          name="customerName"
          label="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name="address"
          label="Address"
          value={form.address}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          name="dateTime"
          label="Date & Time"
          type="datetime-local"
          value={form.dateTime}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <TextField
          name="serviceId"
          label="Service"
          value={form.serviceId}
          onChange={handleChange}
          required
          select
          fullWidth
        >
          {services.map((service) => (
            <MenuItem key={service.id} value={service.id}>
              {service.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Save Booking"}
        </Button>
      </Stack>
    </form>
  );
};

export default BookingForm;
