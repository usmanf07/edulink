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
    // console.log("ygygt")
    
    
    try{
        const check = await User.findOne({email:email, password:password})
        // console.log(email)
        // console.log(check)
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

// app.get('/SignUp1', cors(), (req, res) => {
// })

app.post("/SignUp1", async(req,res)=>{
    const{username,email, password}=req.body
   
    const data = {
        username:username,
        email:email,
        password:password
    }

    try{
        const check = await User.findOne({email:email, password:password})
       
        if(check)
        {
            res.json("exists")
            // console.log(check)
        }
        else{
            res.json("notexists")

           try 
           {
            const result =  await User.insertMany([data]);
            // console.log(result);
            // res.status(200).send("Data inserted successfully");
            } 
            catch (error) 
            {
                // if (error.message.includes("User Validation Failed")) 
                // {
                //     // Handle the validation error
                //     res.json("Uservalidationfailed.");

                // } 
                // else 
                // {
                //     res.json("password_error")
                //     // console.log("An error occurred while inserting data.");
                // }
            }

        }
    }
    catch(e){
        res.json("error")
        console.log(e);
    }
})


app.listen(8000, () => {
    console.log("Server is running on port 8000"); 
})