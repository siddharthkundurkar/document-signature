const express = require("express");

const router = express.Router();

const upload = require("../config/multer.js");

const authMiddleware = require("../middleware/authMiddleware.js");

const {
  uploadDocument,
  getDocuments,
  getDocumentById
} = require("../controllers/document.controller.js");

router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadDocument
);

router.get(
  "/my-documents",
  authMiddleware,
  getDocuments
);

router.get(
  "/:id",
  authMiddleware,
  getDocumentById
);

module.exports = router;