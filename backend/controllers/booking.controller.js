const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
} = require("../services/booking.service");
const { bookingSchema } = require("../validations/booking.validation");

const create = async (req, res) => {
  const { error, value } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const booking = await createBooking(value, req.user.id);
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const bookings = await getUserBookings(req.user);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { error, value } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await updateBooking(id, value, req.user);
    res.status(200).json({ message: "Booking updated", booking: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteBooking(id, req.user);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  create,
  getAll,
  update,
  remove,
};
