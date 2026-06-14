const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createSignature,
  saveSignaturePosition,
} = require("../controllers/signature.controller");

router.post(
  "/create",
  authMiddleware,
  createSignature
);

router.post(
  "/save",
  authMiddleware,
  saveSignaturePosition
);

module.exports = router;