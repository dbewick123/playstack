import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(errorHandler); //error handler should be the last middleware

// Routes placeholder
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/error", (req, res) => {
  throw new Error("This is a test error");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
