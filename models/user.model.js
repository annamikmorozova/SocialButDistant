const mongoose = require('mongoose');
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 70
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 999
    }
}, {
    timestamps: true
});

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .required()
  };
  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validate: validateUser };