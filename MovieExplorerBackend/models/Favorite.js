


const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
  },
  rating: {
    type: Number,
  },
});


module.exports = mongoose.model('Favorite', favoriteSchema);

