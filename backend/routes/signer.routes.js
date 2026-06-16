const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  inviteSigner,
} = require("../controllers/signer.controller");

router.post(
  "/invite",
  authMiddleware,
  inviteSigner
);

module.exports = router;