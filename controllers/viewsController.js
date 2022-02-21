const path = require('path');
const product = require('../DataModel/productModel');
const mobile = require('../DataModel/mobileModel');
const other = require('../DataModel/otherModel');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Home',
  });
});

exports.getother = catchAsync(async (req, res, next) => {
  res.status(200).render('others', {
    title: 'Others',
  });
});
exports.getLaptops = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  // console.log(req.query, ' ', queryObj);
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = product.find(JSON.parse(queryStr));
  const laptop = await query;

  // res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
  res.status(200).render('overview', {
    title: 'Laptops',
    laptop,
  });

  // .json({
  //   status: 'success',
  //   No: laptop.length,
  //   laptop,
  // });
});

exports.getMobiles = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  // console.log(req.query, ' ', queryObj);
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = mobile.find(JSON.parse(queryStr));
  const Mobile = await query;

  res.status(200).render('mobileOverview', {
    title: 'Mobiles',
    Mobile,
  });

  // .json({
  //   status: 'success',
  //   No: Mobile.length,
  //   Mobile,
  // });
});

exports.getOther = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  let query = other.find(JSON.parse(queryStr));
  const Other = await query;
  res.status(200).render('others', {
    title: 'Other',
    Other,
  });
});
