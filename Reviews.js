const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
  "product_id": Number,
  "review_id": Number,
  "recommended": Boolean,
  "star_rating": Number,
  "helpful": Number,
  "summary": String,
  "body": String,
  "response": String,
  "nickname": String,
  "date": String,
  "photos": Array
});

module.exports = mongoose.model('Reviews', ReviewsSchema);