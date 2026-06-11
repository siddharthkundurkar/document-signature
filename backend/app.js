const express = require("express");
const cors = require("cors");

const app = express();
const authroutes=require("./routes/auth.routes.js")

app.use(cors());
app.use(express.json());
app.use("/api/auth", authroutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;