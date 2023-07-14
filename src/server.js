const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const logSymbol = require('log-utils');

const app = express();
const port = process.env.PORT || 3000;

const connection = require('./models/database');
const orderRoutes = require('./routes/orders');

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

app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', orderRoutes);

app.all('*', (req, res) => {
  res.redirect('pedidos');
});

app.listen(port, () => {
  console.log(logSymbol.success, 'Sistema iniciado com sucesso');
});
