require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json);

const readToken = process.env.READ_TOKEN;
