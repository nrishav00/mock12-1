const JWT = require("jsonwebtoken");
require("dotenv").config( );
const tokenCheck = (req,res,next) =>{
    const token = req.headers?.authorization;
    if(token){
        const decoded = JWT.verify(token,process.env.HK);
        if(decoded){
            const userData = decoded.userID;
            req.body.uid = userData;
            next();
        }
        else{
            res.status(400).send({"message" : "User Not Found"})
        }
    }
    else{
        res.status(400).send({"message" : "User Not Found"})
    }
}
module.exports = {
    tokenCheck
}