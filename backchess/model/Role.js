const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Role.associate = function(models) {
  Role.belongsToMany(models.User, { through: 'UserRoles' });
  Role.belongsToMany(models.Authorize, { through: 'RoleAuthorizations' });
};

module.exports = Role;