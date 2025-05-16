import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = 3001;
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Zoom API Integration",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
