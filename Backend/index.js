const express = require("express");
const app = express();
const cors = require("cors")
const mainRouter = require("../Backend/Routes/index");
const JWT_SECRET = require("./config")
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1" , mainRouter)
app.get("/api/v1" , (req,res)=>{
    res.json({
        msg : "sab thik"
    })
})
if(app.listen(PORT)){
    console.log(`server run on ${PORT} port `);
}
else{
    console.log("server crash")
}