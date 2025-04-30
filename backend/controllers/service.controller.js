const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../services/service.service");
const { serviceSchema } = require("../validations/service.validation");

const create = async (req, res) => {
  const { error, value } = serviceSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const service = await createService(value);
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { error, value } = serviceSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await updateService(id, value);
    res.status(200).json({ message: "Service updated", service: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteService(id);
    res.status(200).json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, getAll, update, remove };
