const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

//* con esto realizo el manejo de errores que provienen de sequelize, esta es una manera
// function ormErrorHandler(err, req, res, next) {
//   if (err.message === 'Validation error') {
//     res.status(406).json({
//       message: err.errors[0].message,
//     });
//   }
//   next(err);
// }
//* esta es la forma recomendada usando las instancias de sequelize para detectar los errores
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors[0].message,
    });
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
