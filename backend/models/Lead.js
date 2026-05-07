const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Lead = sequelize.define("Lead", {

    leadName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phoneNumber: {
        type: DataTypes.STRING
    },

    leadSource: {
        type: DataTypes.STRING
    },

    assignedSalesperson: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "New"
    },

    estimatedDealValue: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }

});

module.exports = Lead;