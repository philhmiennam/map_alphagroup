import {
  BOOLEAN
} from 'sequelize';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  active: {
    type: BOOLEAN,
    required: true,
  },
  idrole: {
    type: String,
    required: true,
  },
});

export default mongoose.model('account', courseSchema);