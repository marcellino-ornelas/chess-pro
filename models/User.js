var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true},
});

UserSchema.plugin( passportLocalMongoose/*, {
  usernameField: "email"
}*/);

UserSchema.methods.toURL = function(){
  return '/user/' + this._id
};

var User = mongoose.model('User', UserSchema );

module.exports = User;
