const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const leadController = require("../controllers/leadController");

const validationMiddleware = require("../middleware/validationMiddleware");

const {
    createLeadValidation
} = require("../validators/leadValidator");

router.post(
    "/",
    authMiddleware,
    createLeadValidation,
    validationMiddleware,
    leadController.createLead
);

router.get("/", authMiddleware, leadController.getAllLeads);

router.get("/:id", authMiddleware, leadController.getLeadById);

router.put("/:id", authMiddleware, leadController.updateLead);

router.delete("/:id", authMiddleware, leadController.deleteLead);

module.exports = router;