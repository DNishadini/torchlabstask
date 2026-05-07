const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const noteController = require("../controllers/noteController");

router.post(
    "/:leadId",
    authMiddleware,
    noteController.createNote
);

router.get(
    "/:leadId",
    authMiddleware,
    noteController.getNotesByLead
);

module.exports = router;