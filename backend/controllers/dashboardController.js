const Lead = require("../models/Lead");

const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {

    try {

        const totalLeads = await Lead.count();

        const newLeads = await Lead.count({
            where: {
                status: "New"
            }
        });

        const qualifiedLeads = await Lead.count({
            where: {
                status: "Qualified"
            }
        });

        const wonLeads = await Lead.count({
            where: {
                status: "Won"
            }
        });

        const lostLeads = await Lead.count({
            where: {
                status: "Lost"
            }
        });

        const totalDealValue = await Lead.sum(
            "estimatedDealValue"
        );

        const wonDealValue = await Lead.sum(
            "estimatedDealValue",
            {
                where: {
                    status: "Won"
                }
            }
        );

        res.json({
            totalLeads,
            newLeads,
            qualifiedLeads,
            wonLeads,
            lostLeads,
            totalDealValue: totalDealValue || 0,
            wonDealValue: wonDealValue || 0
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};