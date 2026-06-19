const express =
  require("express");

const router =
  express.Router();

const {
  inviteSigner,
  getDocumentByToken,
  completeSigning,
  rejectSigning,
} = require(
  "../controllers/signer.controller"
);

const authMiddleware =
  require(
    "../middleware//authMiddleware.js"
  );
const {
  captureIp,
} = require(
  "../middleware/auditMiddleware.js"
);
router.post(
  "/invite",
  authMiddleware,
  captureIp,
  inviteSigner
);

router.get(
  "/:token",
  getDocumentByToken
);

router.post(
  "/:token/complete",
  captureIp,
  completeSigning
);
router.post(
  "/:token/reject",
  rejectSigning
);
module.exports = router;