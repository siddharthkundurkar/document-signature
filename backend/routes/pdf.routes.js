const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  generateSignedPdf,
} = require(
  "../controllers/pdf.controller"
);

router.post(
  "/generate",
  authMiddleware,
  generateSignedPdf
);

module.exports = router;