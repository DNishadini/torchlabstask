const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Lead = require("./Lead");

const Note = sequelize.define("Note", {

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

Lead.hasMany(Note, {
    foreignKey: "leadId",
    onDelete: "CASCADE"
});

Note.belongsTo(Lead, {
    foreignKey: "leadId"
});

module.exports = Note;