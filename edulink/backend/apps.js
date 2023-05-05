const express = require('express');
const User = require("./models/user.model");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{email, password}=req.body

    try{
        const check=await User.findOne({email:email})
        if(check){
            res.json("User exists")
        }
        else{
            res.json("Failed")
        }
    }
    catch(e){
        console.log(e)
        res.json("fail")
    }
})