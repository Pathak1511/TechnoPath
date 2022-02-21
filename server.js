const dotenv = require('dotenv');
const mongoose = require('mongoose');
var http = require('http');

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
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

// const port = 5500 || process.env.PORT;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

var server = http.createServer((req, res) => {
  //your stuff
});

//${port} in ${process.env.NODE_ENV}
server.listen(process.env.PORT || 5500, server_host, () => {
  // console.log('App running on port ');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
