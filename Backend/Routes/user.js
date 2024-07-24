const express = require("express");
const zod =require("zod")
const userRouter = express.Router();
// const userStructure = require("../types");
const { User } = require("../database");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const userStructure = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
})

userRouter.post("/signup" , async (req, res)=>{
    const { success } = userStructure.safeParse(req.body);
    if(!success)
    {
        res.status(403).json({
            msg : "invalid user entry "
        })
    }
    const exitsUser = await User.findOne({
        username: req.body.username
    })

    if(exitsUser)
    {
        res.status(401).json({
            msg : "user already exits"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password
    })

    //now every database value given a special id 
    const userid = user._id;

    const token = jwt.sign({
        userid
    }, JWT_SECRET);

    res.json({
        msg : "user created successfully",
        Token : token
    })

})

module.exports =  userRouter