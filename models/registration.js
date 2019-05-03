const mongoose =require('mongoose');
const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    unique: true,
    required: [true, 'First Name cannot be left blank'],
    trim: true
  },
  lastName:{
    type: String,
    unique: true,
    required: [true, 'Last Name cannot be left blank'],
    trim: true
  },
  emailID: {
    type: String,
    unique:true,
    Required:  [true, 'Email address cannot be left blank'],
    trim:true
  },
  password:{
    type: String,
    required: [true, 'Password cannot be left blank'],
  },
  confirmPassword:{
    type: String,
    required: [true, 'Password cannot be left blank'],
  },
  uploadedModels:{
    type: String
  },
  downloadedModels:{
    type: String
  },
  /*for encryption and decryption of password saved*/
  saltSecret: String

});

/*Register UserSchema object inside the mongoose*/
const User =mongoose.model('RegisteredUser', UserSchema);
module.exports = User;
