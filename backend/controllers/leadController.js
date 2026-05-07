const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {

    try {

        const lead = await Lead.create(req.body);

        res.status(201).json(lead);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

exports.getAllLeads = async (req, res) => {

    try {

        const leads = await Lead.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.json(leads);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

exports.getLeadById = async (req, res) => {

    try {

        const lead = await Lead.findByPk(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        res.json(lead);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

exports.updateLead = async (req, res) => {

    try {

        const lead = await Lead.findByPk(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        await lead.update(req.body);

        res.json(lead);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

exports.deleteLead = async (req, res) => {

    try {

        const lead = await Lead.findByPk(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        await lead.destroy();

        res.json({
            message: "Lead deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};