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

const DB =
  'mongodb+srv://hritik1511:%40Pikachu%25%2F_top10%25%40@cluster0.tkqjn.mongodb.net/myFirstDatabase';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

const server = app.listen(5500, () => {
  console.log('App running on port ');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
