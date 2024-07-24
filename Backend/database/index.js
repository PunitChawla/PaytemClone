const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:Punit1234@cluster0.gzacrdj.mongodb.net/PaytmBackend")
const UserSchema = new mongoose.Schema({
  
    username :{
        type : String,
        require : true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname :{
        type : String,
        require : true,
        maxLength : 30,
    },
    lastname:{
        type : String,
        require:true,
        maxLength: 50
    }
})

const AccountSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    balance :{
        type : Number,
        require :true
    }
})

const User = new mongoose.model("User" , UserSchema);
const Account = new mongoose.model("Account" , AccountSchema);
module.exports = {
    User,
    Account
 }

