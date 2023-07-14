const logSymbol = require('log-utils');
const Pedidos = require('../models/pedidos');

const orderPage = (req, res) => {
  res.render('pedidos.ejs');
};

const createOrder = (req, res) => {
  const {
    _nome,
    _endereco,
    _taxa,
    _numerodacasa,
    _telefone,
    _pedido,
    _tipodepizza,
    _valortotal,
    _formadepagamento,
    _data,
  } = req.body;

  Pedidos.create({
    id: 0,
    nome: _nome,
    endereco: _endereco,
    taxa: _taxa,
    telefone: _telefone,
    pedido: _pedido,
    numerodacasa: _numerodacasa,
    tipodepizza: _tipodepizza,
    valortotal: _valortotal,
    formadepagamento: _formadepagamento,
    data: _data,
    status: 'Aberto',
  })
    .then((pedido) => {
      console.log(
        logSymbol.success,
        `Pedido criado com sucesso. { ${pedido.id}, ${pedido.nome} }`,
      );
      res.status(200).redirect(`/verpedido/${pedido.id}`);
    })
    .catch(() => {
      console.log(logSymbol.error, ' Pedido incompleto.');
    });
};

const showOrderByID = (req, res) => {
  Pedidos.findOne({ where: { id: req.params.id } })
    .then((pedido) => {
      const pedidoVer = pedido.dataValues;
      const pizzasTotais = pedidoVer.pedido.toString();
      const arrayPizzas = pizzasTotais.split(',');
      delete pedidoVer.pedido;

      res.status(200).render('verpedido.ejs', { pedidoVer, arrayPizzas });
    })
    .catch((err) => {
      res.render('verpedido.ejs', { pedidoVer: 'idinvalido' });
      console.error(err);
    });
};

const deleteOrderByID = (req, res) => {
  Pedidos.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(200).redirect('/pedidos');
  });
};

const getOrderHistory = (req, res) => {
  Pedidos.findAll({
    order: [['id', 'DESC']],
  }).then((_pedidos) => {
    res.status(200).render('historico.ejs', { pedidos: _pedidos });
  });
};

const updateOrderScreen = (req, res) => {
  Pedidos.findOne({ where: { id: req.params.id } })
    .then((pedido) => {
      const pedidoVer = pedido.dataValues;
      const pizzasTotais = pedidoVer.pedido.toString();
      const arrayPizzas = pizzasTotais.split(',');
      delete pedidoVer.pedido;

      res.status(200).render('editarpedido.ejs', { pedidoVer, arrayPizzas });
    })
    .catch((err) => {
      res.render('verpedido.ejs', { pedidoVer: 'idinvalido' });
      console.error(err);
    });
};

const updateOrder = (req, res) => {
  const {
    _id,
    _nome,
    _endereco,
    _taxa,
    _numerodacasa,
    _telefone,
    _pedido,
    _tipodepizza,
    _valortotal,
    _formadepagamento,
  } = req.body;

  Pedidos.update(
    {
      nome: _nome,
      endereco: _endereco,
      taxa: _taxa,
      numerodacasa: _numerodacasa,
      telefone: _telefone,
      pedido: _pedido,
      tipodepizza: _tipodepizza,
      valortotal: _valortotal,
      formadepagamento: _formadepagamento,
    },
    { where: { id: _id } },
  ).then(() => {
    res.status(200).redirect(`/verpedido/${_id}`);
  });
};

module.exports = {
  orderPage,
  createOrder,
  showOrderByID,
  deleteOrderByID,
  getOrderHistory,
  updateOrderScreen,
  updateOrder,
};
