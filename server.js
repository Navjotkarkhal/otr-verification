// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import otrRoutes from "./routes/otrRoutes.js";

dotenv.config(); // Load environment variables first

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/otr", otrRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { // <-- directly use process.env.MONGO_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
