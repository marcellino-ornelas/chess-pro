const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose'),
      deepPopulate = require('mongoose-deep-populate')(mongoose),
      moment = require('moment');

const possibleStatus = [ 'online', 'offline', 'playing' ];

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: 'online', enum: possibleStatus },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating', required: true }],
  wins: { type:Number, default: 0, required: true }
});

UserSchema.plugin(deepPopulate);
UserSchema.plugin( passportLocalMongoose/*, {
  usernameField: "email"
}*/);

UserSchema.methods.toURL = function(){
  return '/user/' + this._id
};

UserSchema.methods.didWinGame = function( { winner, player1, player2 } ){

  return this._id.toString() ===  (winner._id ? winner._id : winner).toString();

};

UserSchema.methods.generateProgress = function(){
  const self = this;
  const data = [['x'], ['progress'] ];

  let wins = 0;

  self.ratings.forEach(function( rating ){

    if( self.didWinGame( rating ) ){
      wins++
    } else {
      wins !== 0 && wins--
    }

    // dates
    data[0].push( rating.datePlayed );

    // progress
    data[1].push( wins );

  })

  return data

};

var User = mongoose.model('User', UserSchema );

module.exports = User;
