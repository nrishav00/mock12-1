const express=require("express");
const env=require("dotenv");
const dbconnection = require("./Configs/db");
const growUserModel = require("./Models/User.model");
const { tokenCheck } = require("./Middlewares/Auth.middleware");
env.config();
const cors=require("cors");
const app=express();
const port=process.env.PORT || 6000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.post("/register", async (req, res) => {
    try {
      let growdata = await growUserModel.find({ email: req.body.email });
      if (growdata.length > 0) {
        res.status(200).send({ msg: "User Already Exist" });
      } else {
        bcrypt.hash(req.body.password, 4, async (err, hash) => {
          if (err) {
            res.status(500).send({ msg: "Something went wrong !" });
          }
          req.body.password = hash;
          await growUserModel.create(req.body);
          res.status(200).send({ msg: "User registered Successfully" });
        });
      }
    } catch (e) {
      console.log(e);
      res.status(404).send({ msg: "Failed to create new user" });
    }
  });
  app.post("/login", async (req, res) => {
    try {
      let data = await growUserModel.find({ email: req.body.email });
      if (data.length <= 0) {
        res.status(200).send({ msg: "User not found" });
      } else {
        bcrypt.compare(req.body.password, data[0].password, (err, result) => {
          if (err) {
            res.status(500).send({ msg: "Incorrect Password" });
          } else if (result) {
            jwt.sign(
              { userID: data[0]._id },
              process.env.HK,
              (err, token) => {
                res.status(200).send({
                  msg: "Authentication Done",
                  token: token,
                });
              }
            );
          } else {
            res.status(200).send({ msg: "Invalid Data Provided" });
          }
        });
      }
    } catch (e) {
      console.log(e);
      res.status(404).send({ msg: "Failed to login" });
    }
  });
  app.post("/calculate",(req,res)=>{
    let p=req.body.AIA;
    let i=req.body.AIR/100;
    let n=req.body.years;
    let maturityValue = p*[(((1+i)**n)-1)/i];
    res.send({MaturityValue:Math.floor(maturityValue),InvestAmount:p*n,netInterest:Math.floor(maturityValue-(p*n))});
  })
  app.use(tokenCheck);
  app.get("/getProfile",async(req,res)=>{
    try{
        let uid=req.body.uid;
    let userData=await growUserModel.findById(uid);
    res.send(userData);
    }
    catch(e){
        console.log(e);
    }
  })


app.listen(port,()=>{
    dbconnection;
    console.log(`DB connected and listening to http://localhost:${port}`)
})