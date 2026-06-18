const express = require("express");
const router = express.Router();

const {
  getAuditHistory,
} = require("../controllers/audit.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get(

    "/:documentId/history", 
    authMiddleware,
    getAuditHistory
);

module.exports = router;