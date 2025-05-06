const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bus", require("./routes/bus"));

// ✅ Serve React frontend (after build)
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// ✅ Catch-all route for React (client-side routing support)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
