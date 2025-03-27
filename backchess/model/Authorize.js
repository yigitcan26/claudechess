const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Authorize = sequelize.define('Authorize', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Authorize.associate = function(models) {
  Authorize.belongsToMany(models.Role, { through: 'RoleAuthorizations' });
};

module.exports = Authorize;