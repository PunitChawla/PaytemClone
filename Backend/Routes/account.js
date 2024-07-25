const express = require("express");
const accountRouter = express.Router();
const zod =require("zod")
const userRouter = express.Router();
const {userStructure ,signinStructure } = require("../types");
const { User, Account } = require("../database");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authmiddleware } = require("../middleware/middleware");
const { default: mongoose } = require("mongoose");


accountRouter.post("/signup" , async (req, res)=>{
    const { success } = userStructure.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({
            msg : "invalid input "
        })
    }
    const existinguser = await User.findOne({
        username : req.body.username
    })
    if(existinguser){
        return res.json({
            msg : "Email is already taken by someone"
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

    await Account.create({
        userId,
        balance : 1 + Math.random() *10000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        msg : "user created successfully",
        Token : token,
        useid : userId
    })
})

accountRouter.get("/balance", authmiddleware,  async (req,res)=>{
    
    // console.log(req.userId);
    const account = await Account.findOne({
        userId : req.userId
    })

    // console.log(account.balance);
    
    res.json({
        balance : account.balance
    })
})

accountRouter.post("/transfer" , async(req,res)=>{
    const seasion = await mongoose.startSession();

    seasion.startTransaction();
    const { amount , to} = req.body();
    
    const account = await Account.findOne({userId : req.userId }).seasion(session);

    if(!account || account.balance < amount)
    {
        await seasion.abortTransaction();
        return res.status(400).json({
            message : "Insufficinet balance"
        });
    }

    const toAccount = await Account.findOne({userId : to}).session(session);
   
    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message : "invalid account"
        });
    }

    await Account.updateOne({ userId : req.userId} , {$inc: {balance : -amount} }).session(session);
    await Account.upadteOne({userId : req.userId},{$inc : { balance:amount }}).session(session);

    await seasion.commitTransaction();

    res.json({
        message : "Transger seccessful "
    })
})


module.exports = accountRouter;