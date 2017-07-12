// NPM Dependencies
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { collection: 'User', timestamps: true } );

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(this.password, salt).then((hash) => {
        this.password = hash;
        next();
      }).catch((err) => {
        return next();
      });
    }).catch((err) => {
      return next();
    });
  }
  else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    else {
      return cb(null, isMatch);
    }
  });
};

const User = mongoose.model('User', UserSchema);

export default User;
