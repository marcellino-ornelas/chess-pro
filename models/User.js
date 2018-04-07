var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  LastName: { type: String, unique: true, required: true },
  email: [{ type: Schema.Types.ObjectId, ref: 'Rating' }]
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
