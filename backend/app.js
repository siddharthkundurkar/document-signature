const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes=require("./routes/auth.routes.js")
const documentRoutes=require("./routes/document.routes.js")
const signatureRoutes =
  require("./routes/signature.routes");
const signerRoutes =
  require("./routes/signer.routes");
const pdfRoutes =
  require("./routes/pdf.routes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signers", signerRoutes);
app.use("/api/pdf", pdfRoutes);
app.use(
  "/api/signatures",
  signatureRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;