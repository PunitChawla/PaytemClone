const {JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken")
const authmiddleware  = (req, res , next) =>{
    const authheader = req.headers.authorization;
    if(!authheader ){
        return res.status(411).json({msg : "token to shi de "});
    }
        const token = authheader.split(' ')[1]
        console.log(token);
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
            console.log(error);
            return res.status(411).json({ msg  : "auth fail without try"});
        }
}

module.exports = {
    authmiddleware
}