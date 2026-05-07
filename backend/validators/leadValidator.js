const { body } = require("express-validator");

exports.createLeadValidation = [

    body("leadName")
        .notEmpty()
        .withMessage("Lead name is required"),

    body("companyName")
        .notEmpty()
        .withMessage("Company name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("status")
        .optional()
        .isIn([
            "New",
            "Contacted",
            "Qualified",
            "Proposal Sent",
            "Won",
            "Lost"
        ])
        .withMessage("Invalid status")

];