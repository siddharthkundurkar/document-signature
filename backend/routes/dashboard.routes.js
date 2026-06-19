const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller'); 
const authMiddleware = require('../middleware/authMiddleware');

const { getDashboardStats } = dashboardController;
router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

module.exports = router;