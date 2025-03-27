const { Sequelize } = require('sequelize');
require('dotenv').config();

const POSTGRE_USERNAME = process.env.POSTGRE_USERNAME;
const POSTGRE_PASSWORD = process.env.POSTGRE_PASSWORD;
const POSTGRE_HOST = process.env.POSTGRE_HOST;
const POSTGRE_DB = process.env.POSTGRE_DB;

const sequelize = new Sequelize(POSTGRE_DB, POSTGRE_USERNAME, POSTGRE_PASSWORD, {
  host: POSTGRE_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
