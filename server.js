const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/quote", router);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

app.listen(port, () => console.log("SERVER RUNNING ON PORT:", port));
