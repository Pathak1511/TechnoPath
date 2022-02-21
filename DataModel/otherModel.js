const mongoose = require('mongoose');

// REQUIRED MODULES
///////////////////////////////////

const otherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product must be laptop/mobile/sprakers'],
  },
  brand: {
    type: String,
    required: [true, 'product must have brand name'],
  },
  connector: {
    type: String,
    required: [true, 'product must have connector type'],
  },
  color: {
    type: String,
    required: [true, 'product must define color'],
  },
  model: {
    type: String,
    required: [true, 'product must have model name'],
  },
  warranty: {
    type: String,
    required: [true, 'product must have warranty'],
  },
  bluetooth: {
    type: String,
    required: [true, 'product must have bluetooth connection !!!'],
  },
  price: {
    type: String,
    required: [true, 'product should have price'],
  },
  image: {
    type: Buffer,
    required: [true, 'product should have a image!!'],
  },
});

const other = mongoose.model('Other', otherSchema);

module.exports = other;
