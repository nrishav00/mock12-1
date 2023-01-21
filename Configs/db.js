const env=require("dotenv");
env.config();
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
const dbconnection=mongoose.connect(process.env.MONGO_URL);
module.exports=dbconnection;