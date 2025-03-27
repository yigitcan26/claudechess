const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Challenge = sequelize.define('Challenge', {
    participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
    },
    puzzles: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
    },
    numberOfPuzzles: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    winner: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Challenge;