const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const logSymbol = require('log-utils');

const app = express();
const port = process.env.PORT || 3000;

const connection = require('./models/database');
const Pedidos = require('./models/pedidos');

connection
  .authenticate()
  .then(() => {
    console.warn(
      logSymbol.success,
      'Conexão do banco de dados feita com sucesso',
    );
  })
  .catch((errorMessage) => {
    console.error(logSymbol.error, errorMessage);
  });

// App configurations

app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Fazer o pedido
 *
 */
app.get('/pedidos', (req, res) => {
  res.render('pedidos.ejs');
});

/**
 * Criar pedido
 *
 */
app.post('/criarpedido', (req, res) => {
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
});

/** Deletar pedido
 *
 * @param   {[Number]}  /users/:id  [/users/:id]
 *
 */

app.post('/deletarpedido/:id', (req, res) => {
  Pedidos.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(200).redirect('/pedidos');
  });
});

/**
 * Listar o histórico de pedidos
 *
 */

app.get('/historico', (req, res) => {
  Pedidos.findAll({
    order: [['id', 'DESC']],
  }).then((_pedidos) => {
    res.status(200).render('historico.ejs', { pedidos: _pedidos });
  });
});

/**
 * Listar um único pedido
 *
 */

app.get('/verpedido/:id', (req, res) => {
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
});

app.get('/editarpedido/:id', (req, res) => {
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
});

app.post('/editarpedido/insert', (req, res) => {
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
});

app.get('*', (req, res) => {
  res.redirect('/pedidos');
});

app.listen(port, () => {
  console.log(logSymbol.success, 'Sistema iniciado com sucesso');
});
