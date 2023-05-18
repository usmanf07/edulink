
process.env.TMPDIR = '/path/to/directory';
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://orthoimplantsgu:miansahib@mycluster.hpxkjj2.mongodb.net/?retryWrites=true&w=majority";
const cors=require('cors');
const fs = require('fs');
const formidable = require('formidable');
const mv = require('mv');
const pdfkit = require('pdfkit');
const { promisify } = require('util');
const path = require('path');

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

app.use('/logos', express.static('logos'));

const usersRouter = require('./routes/university');
app.use('/university', usersRouter);

const signin = require('./routes/signin');
app.use('/login',signin);

const signup = require('./routes/signup');
app.use('/signup',signup);

const SingleInstitute = require('./routes/SingleUniversity');
app.use('/SingleInstitutePage',SingleInstitute);


const uRouter = require('./routes/users');
app.use('/users', uRouter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.use('/uploads', express.static('uploads'));

const applicationRouter = require('./routes/application');
app.use('/application', applicationRouter);

const entryTestRouter = require('./routes/entrytest');
app.use('/entrytest', entryTestRouter);

const fetchinstitutesRouter = require('./routes/fetchinstitutes');
app.use('/fetchinstitutes', fetchinstitutesRouter);


const mvAsync = promisify(mv);

app.post('/generate-pdf', async (req, res) => {
  const { questions } = req.body;

  const doc = new pdfkit();
  const filePath = path.join(__dirname, '/images/questions.pdf');

  doc.pipe(fs.createWriteStream(filePath));

  questions.forEach((question, index) => {
    doc.text(`Question ${index + 1}`, { bold: true });
    doc.text(question.statement);
    question.options.forEach((option) => {
      doc.text(option.statement);
    });
    doc.moveDown();
  });

  doc.end();

  console.log(filePath);
  // await mvAsync(filePath, path.join(__dirname, 'questions.pdf'));

  const downloadUrl = 'http://localhost:8000/images/questions.pdf';
  res.json({ downloadUrl });
});
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
