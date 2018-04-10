var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const possibleStatus = ['waiting', 'playing', 'gameover'];

var GameSchema = new Schema({
  turn: { type: String, required: true, default:'white', enum: ['white','black'] },
  status: { type: String, required: true, enum: possibleStatus, default: 'waiting' },
  isPublic: { type: Boolean, required: true, default: false },
  player1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  player2: { type: Schema.Types.ObjectId, ref: 'User' },
  // gameWinner:{ type: Schema.Types.ObjectId, ref: 'User' }
  // gameCreater: { type: Schema.Types.ObjectId, ref: 'Rating', required: true },
});

GameSchema.plugin( passportLocalMongoose/*, {
  usernameField: "email"
}*/);

GameSchema.methods.toURL = function(){
  return '/game/' + this._id
};

var Game = mongoose.model('Game', GameSchema );

module.exports = Game;
