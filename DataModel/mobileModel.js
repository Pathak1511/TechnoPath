const mongoose = require('mongoose');

// REQUIRED MODULES
//////////////////////////////////////////

const mobileSchema = new mongoose.Schema({
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
  battery: {
    type: String,
  },
  display: {
    type: String,
  },
  ram: {
    type: String,
    required: [true, 'product should have storage details'],
  },
  camera: {
    type: String,
  },
  rom: {
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

const mobile = mongoose.model('Mobile', mobileSchema);

module.exports = mobile;
