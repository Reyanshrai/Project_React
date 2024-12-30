const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
// Define the User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10,15}$/, 'Please enter a valid phone number'],
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    select:false
  },
 
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false,
  },

  address: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password)
}


// Method to compare passwords
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Compile and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
