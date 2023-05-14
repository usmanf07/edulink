

const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://orthoimplantsgu:miansahib@mycluster.hpxkjj2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}
).catch((err) => {
    console.log(err);
});



const express = require('express');
// const User = require('./mongo');
const cors = require('cors')


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json());

app.use('/images', express.static('images'));



const usersRouter = require('./routes/university');
app.use('/university', usersRouter);

const signin = require('./routes/signin');
app.use('/login',signin);

const SingleInstitute = require('./routes/SingleUniversity');
app.use('/SingleInstitutePage',SingleInstitute);

const uRouter = require('./routes/users');
app.use('/users', uRouter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.use('/uploads', express.static('uploads'));

const applicationRouter = require('./routes/application');
app.use('/application', applicationRouter);
// app.use(cookieParser());
// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//   }));

// app.get('/', cors(), (req, res) => {
// })

// app.post("/login", async(req,res)=>{
//     const{email, password}=req.body
//     // console.log("ygygt")


//     try{
//         // const check = await User.findOne({email:email, password:password})
//         const check = await User.findOne({ $or: [{ email }, { password }] });
//         // console.log(email)
//         // console.log(check)
//         if(check)
//         {

           
              
//             // True condition to be logged in
//             req.session.userId = check.email;
//             console.log(req.session.userId);

            

//             // var c = res.cookie('userId', check._id, { maxAge: 30 * 24 * 60 * 60 }); // Set a cookie that expires in 30 days
//             // console.log(c);
//             // res.json({ check });
//             res.json( req.session.userId)


//             // app.get('/my-route', (req, res) => {
//             //     req.session.myData = 'some data';
//             //     res.json({ myData: req.session.myData });
//             //   });


//         }
//         else{
//             res.json("notexists")
//         }
//     }
//     catch(e){
//         res.json("notexists")
//         console.log(e);
//     }
// })

// // app.get('/SignUp1', cors(), (req, res) => {
// // })

// app.post("/SignUp1", async(req,res)=>{
//     const{username,email, password}=req.body

//     const data = {
//         username:username,
//         email:email,
//         password:password
//     }

//     try{
//         const check = await User.findOne({email:email, password:password})

//         if(check)
//         {
//             res.json("exists")
//             // console.log(check)
//         }
//         else{
//             res.json("notexists")

//            try
//            {
//             const result =  await User.insertMany([data]);
//             // console.log(result);
//             // res.status(200).send("Data inserted successfully");
//             }
//             catch (error)
//             {
//                 // if (error.message.includes("User Validation Failed"))
//                 // {
//                 //     // Handle the validation error
//                 //     res.json("Uservalidationfailed.");

//                 // }
//                 // else
//                 // {
//                 //     res.json("password_error")
//                 //     // console.log("An error occurred while inserting data.");
//                 // }
//             }

//         }
//     }
//     catch(e){
//         res.json("error")
//         console.log(e);
//     }
// })


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
