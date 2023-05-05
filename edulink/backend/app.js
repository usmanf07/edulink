const express = require('express');
const User = require('./mongo');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', cors(), (req, res) => {
})

app.post("/", async(req,res)=>{
    const{email, password}=req.body
    
    try{
        const check = await User.findOne({email:email, password:password})
        console.log(email)
        console.log(check)
        if(check)
        {
            res.json("exists")
        }
        else{
            res.json("notexists")
        }
    }
    catch(e){
        res.json("notexists")
        console.log(e);
    }
})

app.listen(8000, () => {
    console.log("Server is running on port 8000"); 
})