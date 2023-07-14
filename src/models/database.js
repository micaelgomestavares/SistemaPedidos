const { Sequelize } = require('sequelize');

const connection = new Sequelize('customdatabase', 'root', 'custompassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = connection;
