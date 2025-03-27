const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Rank = sequelize.define('Rank', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requirement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Rank;