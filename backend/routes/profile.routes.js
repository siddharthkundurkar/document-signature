const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getProfileFields,
} = require(
  "../controllers/profile.controller"
);

router.get(
  "/profile-fields",
  authMiddleware,
  getProfileFields
);

module.exports = router;