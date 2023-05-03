const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const uri = "mongodb+srv://orthoimplantsgu:miansahib@mycluster.hpxkjj2.mongodb.net/?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


mongoose.connect(uri, options);

  const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})





require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use(cors());
app.use(express.json());



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
