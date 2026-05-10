// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const notesRoutes = require("./routes/notesRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setting Routes
require("./schema/Notes"); // Untuk generate Tabel 
app.use("/api/v1/notes", notesRoutes); // Untuk setting routes

// Sync Database dan Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
