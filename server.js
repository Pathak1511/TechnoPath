const dotenv = require('dotenv');
const mongoose = require('mongoose');
// var http = require('http');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: 'config.env' });
const app = require('./app');
const { type } = require('express/lib/response');

// REQUIRED MODULES
//////////////////////////////////////////

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

const server = app.listen(process.env.PORT || 5500, () => {
  console.log('App running on port ');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
