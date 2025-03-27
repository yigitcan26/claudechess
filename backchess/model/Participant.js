const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Participant = sequelize.define('Participant', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    challengeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    isWinner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    puzzleNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Participant;