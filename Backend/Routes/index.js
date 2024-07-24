const express  = require("express")
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");
router.use("/user",userRouter);
console.log("gya to h ")
router.use("/account" , accountRouter);


module.exports = router;
