const express = require("express");

const router = express.Router();

const upload = require("../config/multer.js");

const authMiddleware = require("../middleware/authMiddleware.js");

const {
  uploadDocument,
} = require("../controllers/document.controller.js");

router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadDocument
);

module.exports = router;