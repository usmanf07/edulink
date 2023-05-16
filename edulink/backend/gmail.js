const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());


app.post("/", (req, res) => {
  const { receiver, subject, message } = req.body;

  console.log(receiver);
  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "orthoimplantsgu@gmail.com",
      clientId: "420068824513-6cgvcp1360kvs9e6egpmeveqec43pjea.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04AkSObuHvOfjCgYIARAAGAQSNwF-L9IrQzFrpRjJZVUIk1DEMKylV8qWO0ciwOypxMc5waYdPbBHHChEMUrvui8F3sPvAE55vHM"
    }
  });

  let messageTemplate = {
    to: receiver,
    subject: subject,
    text: message
  };

  smtpTransport.sendMail(messageTemplate, (err, info) => {
    if (err) {
      res.send(err);
    } else {
      smtpTransport.close();
      return res.json({
        status: "ok",
        msg: "Email sent"
      });
    }
  });
});

app.listen(3000, () => console.log("Server Up"));
