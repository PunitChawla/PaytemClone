// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://admin:Punit1234@cluster0.gzacrdj.mongodb.net/PaytmBackend")
// const UserSchema = new mongoose.Schema({
  
//     username :{
//         type : String,
//         require : true
//     },

//     password: {
//         type: String,
//         require: true,
      
//     },
//     firstname :{
//         type : String,
//         require : true,
//         maxLength : 30,
//     },
//     lastname:{
//         type : String,
//         require:true,
//         maxLength: 50
//     }
// })

// const AccountSchema = new mongoose.Schema({
//     userId :{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'User',
//         require : true
//     },
//     balance :{
//         type : Number,
//         require :true
//     }
// })

// const User = new mongoose.model("User" , UserSchema);
// const Account = new mongoose.model("Account" , AccountSchema);
// module.exports = {
//     User,
//     Account
//  }


// backend/db.js
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:Punit1234@cluster0.gzacrdj.mongodb.net/PaytmBackend")

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};