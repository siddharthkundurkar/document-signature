const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes=require("./routes/auth.routes.js")
const documentRoutes=require("./routes/document.routes.js")
const signatureRoutes =
  require("./routes/signature.routes.js");
const signerRoutes =
  require("./routes/signer.routes.js");
const pdfRoutes =
  require("./routes/pdf.routes.js");

  const auditRoutes =
  require("./routes/audit.routes.js");

  const dashboardRoutes =
  require("./routes/dashboard.routes.js");
const profileRoutes =
  require("./routes/profile.routes.js");
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
app.use("/api/audit", auditRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/profile",
  profileRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;