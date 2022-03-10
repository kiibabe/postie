const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const postSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  postedDate: {
    type: Date,
  }
});

module.exports = mongoose.model('Post', postSchema);
