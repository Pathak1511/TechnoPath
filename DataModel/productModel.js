const mongoose = require('mongoose');

// REQUIRED MODULES
//////////////////////////////////////////

const productSchema = new mongoose.Schema({
  ///////////////////
  name: {
    type: String,
    required: [true, 'Product must have name'],
    // runValidators: true,
  },
  subtype: {
    type: String,
    required: [true, 'product must be laptop/mobile/sprakers'],
  },
  price: {
    type: Number,
    required: [true, 'product should have price'],
  },
  image: {
    type: Buffer,
    required: [true, 'product must have an image'],
  },
  best: {
    type: String,
  },
  processor: {
    type: String,
  },
  os: {
    type: String,
  },
  ram: {
    type: String,
    required: [true, 'product should have storage details'],
  },
  extrarom: {
    type: String,
  },
  rom: {
    type: String,
  },
  romtypes: {
    type: String,
  },
  size: {
    type: String,
    required: [true, 'product should have sizes'],
  },
  amz: {
    type: String,
  },
  flipkart: {
    type: String,
  },
  pros: {
    type: Array,
  },
  cons: {
    type: Array,
  },
});

const product = mongoose.model('Product', productSchema);

module.exports = product;
