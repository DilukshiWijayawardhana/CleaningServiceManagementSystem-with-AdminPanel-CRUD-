const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createService(data) {
  return await prisma.service.create({ data });
}

async function getAllServices() {
  return await prisma.service.findMany();
}

async function updateService(id, data) {
  return await prisma.service.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteService(id) {
  return await prisma.service.delete({ where: { id: Number(id) } });
}

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
