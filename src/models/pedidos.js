const Sequelize = require('sequelize');
const connection = require('./database');

const Pedido = connection.define('pedidos', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  taxa: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  pedido: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  numerodacasa: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  tipodepizza: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  valortotal: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  formadepagamento: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

Pedido.sync({ force: false }).then(() => {});

module.exports = Pedido;
