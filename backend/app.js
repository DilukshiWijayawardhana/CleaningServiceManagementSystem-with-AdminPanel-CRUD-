const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/route");
const app = express();

dotenv.config();

// Enable CORS for all origins or specify your frontend origin
app.use(cors()); // Allows all origins (frontend on port 3000)
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
