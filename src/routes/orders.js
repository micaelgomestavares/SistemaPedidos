const express = require('express');

const {
  createOrder,
  orderPage,
  showOrderByID,
  deleteOrderByID,
  getOrderHistory,
  updateOrderScreen,
  updateOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/pedidos', orderPage);
router.get('/verpedido/:id', showOrderByID);
router.get('/historico', getOrderHistory);
router.get('/editarpedido/:id', updateOrderScreen);

router.post('/criarpedido', createOrder);
router.post('/deletarpedido/:id', deleteOrderByID);
router.post('/editarpedido/insert', updateOrder);

module.exports = router;
