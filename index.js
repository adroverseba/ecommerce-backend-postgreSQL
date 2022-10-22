const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:8080',
  'https://myapp.co',
  'https://adroverseba.github.io',
  'https://adroverseba.github.io/react-super-shop-ecommerce',
  'https://adroverseba.github.io/react-super-shop-ecommerce/',
  'http://localhost:3000',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
//importacion de la logica de passport ANTES DE Routing
require('./utils/auth');
routerApi(app);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});
