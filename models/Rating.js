var mongoose = require('mongoose'),
  moment = require('moment'),
  Schema = mongoose.Schema;

// const possibleStatus = ['waiting', 'playing', ' gameover'];

var RatingSchema = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  player2: { type: Schema.Types.ObjectId, ref: 'User' },
  winner: { type: Schema.Types.ObjectId, ref: 'User' },
  datePlayed: { type: Date, default: Date.now, required: true }
});


RatingSchema.virtual('fromNow').get(function() {
  return moment(this.datePlayed).fromNow();
});

var Rating = mongoose.model('Rating', RatingSchema );

module.exports = Rating;
