const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function createBooking(data, userId) {
  return await prisma.booking.create({
    data: {
      customerName: data.customerName,
      address: data.address,
      dateTime: new Date(data.dateTime),
      serviceId: data.serviceId,
      userId,
    },
  });
}

async function getUserBookings(user) {
  if (user.role === "ADMIN") {
    return await prisma.booking.findMany({
      include: { service: true, user: true },
    });
  }
  return await prisma.booking.findMany({
    where: { userId: user.id },
    include: { service: true },
  });
}

async function updateBooking(id, data, user) {
  const booking = await prisma.booking.findUnique({
    where: { id: Number(id) },
  });

  if (!booking) throw new Error("Booking not found");
  if (user.role !== "ADMIN" && booking.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      customerName: data.customerName,
      address: data.address,
      dateTime: new Date(data.dateTime),
      serviceId: data.serviceId,
    },
  });
}

async function deleteBooking(id, user) {
  const booking = await prisma.booking.findUnique({
    where: { id: Number(id) },
  });
  if (!booking) throw new Error("Booking not found");
  if (user.role !== "ADMIN" && booking.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.booking.delete({ where: { id: Number(id) } });
}

module.exports = {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
