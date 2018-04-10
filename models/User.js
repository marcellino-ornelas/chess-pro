var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const possibleStatus = [ 'online', 'offline', 'playing' ];

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  status: { type: String, required: true, default: 'online', enum: possibleStatus }
});

UserSchema.plugin( passportLocalMongoose/*, {
  usernameField: "email"
}*/);

UserSchema.methods.toURL = function(){
  return '/user/' + this._id
};

// UserSchema.methods.changeStatus = function( status ){
//   return new Promise(function( resolve, reject ){

//   })
// };

var User = mongoose.model('User', UserSchema );

module.exports = User;
