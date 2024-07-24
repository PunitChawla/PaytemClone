const {JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken")
const authmiddleware  = (req, res , next) =>{
    // const authheader = req.headers.authorization;
    // if(!authheader || !authheader.startsWith('Bearer ')){
    //     return res.status(403).json({msg : "token to shi de "});
    // }
        // const token = authheader.split(' ')[1]
        const token = req.headers.authorization;
        try {
            const decode = jwt.verify(token, JWT_SECRET)
            console.log(decode);
            if(decode.userId)
            {
                req.userId = decode.userId;
                next();
            }
            else{
                return res.status(411).json({ msg  : "auth fail "});
            }
        } catch (error) {
            return res.status(411).json({ msg  : "auth fail without try"});
        }
}

module.exports = {
    authmiddleware
}