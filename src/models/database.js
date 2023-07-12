const { Sequelize } = require('sequelize');

const connection = new Sequelize('customdatabase', 'root', '18101529M', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = connection;
