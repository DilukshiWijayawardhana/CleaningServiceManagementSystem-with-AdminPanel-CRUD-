import axios from "axios";

const API_URL = "http://localhost:4000/api/bookings";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get bookings (for regular users gets their bookings, for admin gets all bookings)
export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Admin-only: Get all bookings
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Update a booking
export const updateBooking = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
