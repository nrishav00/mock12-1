const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:String,
    password:String,
    name:String,
    time:String
});
const growUserModel=mongoose.model("growuser",UserSchema);
module.exports=growUserModel;