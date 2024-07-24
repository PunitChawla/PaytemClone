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

const User = new mongoose.model("User" , UserSchema);
module.exports = {
    User
 }

