const express = require('express');
const cors = require("cors");
const rootRouter = require("./Routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

if(app.listen(3000)){
    console.log("server started")
}