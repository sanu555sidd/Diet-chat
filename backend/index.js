import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import faqRoutes from "./routes/faqRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Diet Chat Backend is running");
});

app.use("/faqs", faqRoutes);      // GET /faqs
app.use("/query", queryRoutes);   // POST /query

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
