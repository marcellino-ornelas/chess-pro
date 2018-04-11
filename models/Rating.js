var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const possibleStatus = ['waiting', 'playing', 'gameover'];

var RatingSchema = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  player2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  winner: { type: Schema.Types.ObjectId, ref: 'User' },
  datePlayed: { type: Date, default: Date.now, required: true }
});

var Rating = mongoose.model('Rating', RatingSchema );

module.exports = Rating;
