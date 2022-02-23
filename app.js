const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const productRouter = require('./routes/productRouters');
const viewRouter = require('./routes/viewRouters');
const AppError = require('./utils/newAppError');
const GlobalErrorController = require('./controllers/errorController');
const helmet = require('helmet');
const hpp = require('hpp');
const app = express();
const cors = require('cors');
// REQUIRED MODULES
//////////////////////////////////////////

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public/')));

//MIDDLEWARE STACK FOR SECURITY

//SET SECURITY HTTP HEADERS
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// APPLYING LIMITER
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 30 * 1000,
  message: 'Try Again After 30 Minutes !! To many request from same IP',
});
app.use('/api', limiter);

//BODY PARSER, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//DATA SANITIZATION AGAINST NoSQL query injection
app.use(mongoSanitize());
//DATA SANITIZATION AGAINST XSS
app.use(xss());

//PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: ['size'],
  })
);

// Html external used files security policy
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self'  'nonce-popojk' https://unpkg.com",
    "style-src 'self' 'https://www.amazon.in/'"
  );
  return next();
});

app.use(cors());

// ROUTEs
app.use('/', viewRouter);
if (process.env.NODE_ENV === 'development') {
  app.use('/api/products', productRouter);
}
// app.use('/api/products', function (req, res, next) {
//   res.status(err.status).render('error', {
//     title: 'Error 404',
//     status: err.status,
//     statusCode: 404,
//     message: 'Page not found',
//   });
// });

app.all('*', function (req, res, next) {
  // res.status(404).sendFile('public/error.html', { root: __dirname });
  const err = new AppError(`Can't find ${req.originalUrl} in this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use(GlobalErrorController);

module.exports = app;
