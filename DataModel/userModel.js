const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please !! Provide us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email !'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Cinfirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not matching',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const user = mongoose.model('User', userSchema);

module.exports = user;
