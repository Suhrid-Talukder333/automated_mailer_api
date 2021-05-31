const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const server = express();
server.use(express.json());
server.use(cors());

let name = "";
let email = "";
let text = "";

server.post("/", (req, res) => {
  const { person_name, person_email, person_text } = req.body;
  name = person_name;
  email = person_email;
  text = person_text;
  console.log(name, email, text);
  transporter
    .sendMail({
      from: '"Suhrid Talukder" <suhridtalukder333@gmail.com>',
      to: email,
      subject: "Thank You for your feedback",
      text: `Hello ${name}, hope your are doing well. I am pleased to have your feedback, thank you. This is an automated email , so I will get in touch with you as soon as I can 😁`,
    })
    .then((info) => {
      console.log({ info });
      res.json({
        check: true,
      });
    })
    .catch(console.error);
});

server.listen(3001, () => {
  console.log(`The server is running at port 3001`);
});
