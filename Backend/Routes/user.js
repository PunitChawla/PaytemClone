const express = require("express");
const zod =require("zod")
const userRouter = express.Router();
const {userStructure ,signinStructure } = require("../types");
const { User } = require("../database");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authmiddleware } = require("../middleware/middleware");


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
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        msg : "user created successfully",
        Token : token
    })

})

userRouter.post("/signin" , async (req,res)=>{
    const { success } = signinStructure.safeParse(req.body);
    if(!success)
    {
        res.status(403).json({
            msg : "invalid user entry"
        })
    }

    const user =  await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            Token: token
        })
        return;
    }
    res.status(411).json({
        msg : "error while loging "
    })
})

const updatebody = zod.object({
    firstname :  zod.string(),
    password : zod.string(),
    lastname : zod.string()

})
userRouter.put("/update", authmiddleware , async (req, res)=>{

    const { success } =  updatebody.safeParse(req.body);
    if(!success)
    {
        res.status(403).json({
            msg  : "invalid input "
        })
    }
    await User.updateOne({ _id: req.userId} , req.body);

    res.json({
        msg : "update successfully "
    })

})
userRouter.get("/bluk" , async (req , res)=>{
    const filter = req.query.flter || ""

    const users = User.findOne({

        $or : [{
            firstname :{
                "$regex" : filter
            },
            lastname :{
                "$regex" : filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports =  userRouter