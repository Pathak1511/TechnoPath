const { query } = require('express');
const product = require('./../DataModel/productModel');
const Mobile = require('./../DataModel/mobileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/newAppError');
//////////////////////////////////////////

exports.laptopMiddleware = (req, res, next) => {
  req.query.subtype = 'programmer';
  next();
};

exports.MobileMiddleware = (req, res, next) => {
  req.query = req.query;
  next();
};

// exports.getIDMiddleware = (req, res, next) => {
//   req.query.id;
// };

exports.getMobproduct = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  // console.log(req.query, ' ', queryObj);
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // EXECUTION QUERY
  let query = Mobile.find();
  //JSON.parse(queryStr)
  const product = await query;
  res.status(200).json({
    status: 'success',
    results: product.length,
    product,
  });
});

// getting products || get in pacman

exports.getProduct = catchAsync(async (req, res, next) => {
  // next();
  // BUILDING QUERY
  const queryObj = { ...req.query };
  // console.log(req.query, ' ', queryObj);
  const excludesFields = ['page', 'sort', 'limit', 'fields'];
  excludesFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // EXECUTION QUERY
  let query = product.find(JSON.parse(queryStr));

  //SORTING
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort('no');
  }
  //FIELDS
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('');
  }
  //PAGINATION
  const page = req.query.page * 1 || 1;
  const limit = req.query.limiy * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numProducts = await product.countDocuments();
    // it should be improved
    if (skip >= numProducts) throw new Error('This page Doesn' + 't exist');
  }

  const products = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    products,
  });
});

// get Product by id

exports.getProductByid = catchAsync(async (req, res, next) => {
  const query = req.params.id;
  const products = await product.findById(query);
  if (!products) {
    return next(new AppError('No product found with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    results: products.length,
    products,
  });
});

// Changes should be done

// creating new products in DB || post in pacman
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
});

// updating products

exports.updateProduct = catchAsync(async (req, res, next) => {
  const products = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!products) {
    return next(new AppError('No product found with this id', 404));
  }

  res.status(200).json({
    status: 'successfull',
    data: {
      products,
    },
  });
});

// deleting products

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const products = await product.findByIdAndDelete(req.params.id);

  if (!products) {
    return next(new AppError('No product found with this id', 404));
  }

  res.status(204).json({
    status: 'product deleted successfully',
    data: 'null',
  });
});
