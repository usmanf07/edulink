
process.env.TMPDIR = '/path/to/directory';
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://orthoimplantsgu:miansahib@mycluster.hpxkjj2.mongodb.net/?retryWrites=true&w=majority";
const cors=require('cors');
const fs = require('fs');
const formidable = require('formidable');
const mv = require('mv');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}
).catch((err) => {
    console.log(err);
});



const express = require('express');
// const User = require('./mongo');



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



app.post('/upload', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image.filepath;
      console.log(oldpath);
      var newpath = __dirname+'/images/' + files.image.originalFilename;

      mv(oldpath, newpath, function (err) {
        if (err) throw err;
        else
        res.write('File uploaded and moved!');
        res.end();
      });
 ;
    });

  });
app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
