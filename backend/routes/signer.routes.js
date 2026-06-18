const express =
  require("express");

const router =
  express.Router();

const {
  inviteSigner,
  getDocumentByToken,
  completeSigning,
} = require(
  "../controllers/signer.controller"
);

const authMiddleware =
  require(
    "../middleware//authMiddleware.js"
  );

router.post(
  "/invite",
  authMiddleware,
  inviteSigner
);

router.get(
  "/:token",
  getDocumentByToken
);

router.post(
  "/complete/:token",
  completeSigning
);

module.exports = router;