// const express = require("express");
// const accountRouter = express.Router();
// const zod =require("zod")
// const userRouter = express.Router();
// const {userStructure ,signinStructure } = require("../types");
// const { User, Account } = require("../database");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config");
// const { authmiddleware } = require("../middleware/middleware");
// const { default: mongoose } = require("mongoose");


// accountRouter.post("/signup" , async (req, res)=>{
//     const { success } = userStructure.safeParse(req.body);
//     if(!success)
//     {
//         return res.status(411).json({
//             msg : "invalid input "
//         })
//     }
//     const existinguser = await User.findOne({
//         username : req.body.username
//     })
//     if(existinguser){
//         return res.json({
//             msg : "Email is already taken by someone"
//         })
//     }

//     const user = await User.create({
//         username : req.body.username,
//         firstname : req.body.firstname,
//         lastname : req.body.lastname,
//         password : req.body.password
//     })

//     //now every database value given a special id 
//     const userId = user._id;

//     await Account.create({
//         userId,
//         balance : 1 + Math.random() *10000
//     })
//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//     return res.json({
//         msg : "user created successfully",
//         Token : token,
//     })
// })

// accountRouter.get("/balance", authmiddleware,  async (req,res)=>{
    
//     // console.log(req.userId);
//     const account = await Account.findOne({
//         userId : req.userId
//     })

//     // console.log(account.balance);
    
//     res.json({
//         balance : account.balance
//     })
// })

// accountRouter.post("/transfer" , authmiddleware,  async(req,res)=>{
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Invalid account"
//         });
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({
//         message: "Transfer successful"
//     });
// })


// module.exports = accountRouter;




const express = require('express');
const { authMiddleware } = require('../middleware/middleware');
const { Account } = require('../database/index');
const {  mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer" , authMiddleware,  async(req,res)=>{
        const session = await mongoose.startSession();
    
        session.startTransaction();
        const { amount, to } = req.body;
    
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);
    
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        try {
            await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        } catch (error) {

            return res.json({
                message : "Plese Enter an Amount"
            })
        }
        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    })
    
module.exports = router;