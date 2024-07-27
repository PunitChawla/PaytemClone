// const express = require("express");
// const zod =require("zod")
// const userRouter = express.Router();
// const {userStructure ,signinStructure } = require("../types");
// const { User } = require("../database");
// const jwt = require("jsonwebtoken");
// const cors = require("cors")
// const { JWT_SECRET } = require("../config");
// const { authmiddleware } = require("../middleware/middleware");
// console.log(JWT_SECRET);
// cors.use
// userRouter.post("/signup" , async (req, res)=>{
//     const { success } = userStructure.safeParse(req.body);
//     if(!success)
//     {
//       return res.status(403).json({
//             msg : "invalid user entry "
//         })
//     }
//     const exitsUser = await User.findOne({
//         username: req.body.username
//     })

//     if (exitsUser) {
//         return res.status(411).json({
//             message: "Email already taken/Incorrect inputs"
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

//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//    return  res.json({
//         msg : "user created successfully",
//         Token : token
//     })

// })

// userRouter.post("/signin" , async (req,res)=>{
//     const { success } = signinStructure.safeParse(req.body);
//     if(!success)
//     {
//         res.status(403).json({
//             msg : "invalid user entry"
//         })
//     }

//     const user =  await User.findOne({
//         username : req.body.username,
//         password : req.body.password
//     })

//     if (user) {
//         const token = jwt.sign({
//             userId: user._id
//         }, JWT_SECRET);
  
//         res.json({
//             Token: token
//         })
//         return;
//     }
//     res.status(411).json({
//         msg : "error while loging "
//     })
// })

// const updatebody = zod.object({
//     firstname :  zod.string(),
//     password : zod.string(),
//     lastname : zod.string()

// })
// userRouter.put("/update",   authmiddleware , async (req, res)=>{

//     const { success } =  updatebody.safeParse(req.body);
//     if(!success)
//     {
//         res.status(403).json({
//             msg  : "invalid input "
//         })
//     }
//     await User.updateOne({ _id: req.userId} , req.body);

//     res.json({
//         msg : "update successfully "
//     })

// })
// userRouter.get("/bulk" , async (req , res)=>{
//     const filter = req.query.flter || ""

//     const users =  await User.find({

//         $or : [{
//             firstname :{
//                 "$regex" : filter
//             },
//             lastname :{
//                 "$regex" : filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             username: user.username,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             _id: user._id
//         }))
//     })
// })

// module.exports =  userRouter

// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../database/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware/middleware");

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
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

module.exports = router;