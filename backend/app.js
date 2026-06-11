const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes=require("./routes/auth.routes.js")
const documentRoutes=require("./routes/document.routes.js")
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;