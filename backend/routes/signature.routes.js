const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createSignature,
  saveSignaturePosition,
  saveMySignature,
  getMySignatures,
} = require(
  "../controllers/signature.controller"
);

router.post(
  "/save",
  authMiddleware,
  saveSignaturePosition
);

router.post(
  "/save-my-signature",
  authMiddleware,
  saveMySignature
);

router.get(
  "/my-signatures",
  authMiddleware,
  getMySignatures
);

module.exports = router;