const Note = require("../models/Note");

const Lead = require("../models/Lead");

exports.createNote = async (req, res) => {

    try {

        const { content, createdBy } = req.body;

        const lead = await Lead.findByPk(req.params.leadId);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        const note = await Note.create({
            content,
            createdBy,
            leadId: req.params.leadId
        });

        res.status(201).json(note);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

exports.getNotesByLead = async (req, res) => {

    try {

        const notes = await Note.findAll({
            where: {
                leadId: req.params.leadId
            },
            order: [["createdAt", "DESC"]]
        });

        res.json(notes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};