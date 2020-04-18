const dotenv = require("dotenv");
dotenv.config();

const connection = require('./database/connection')
const consign = require('consign');
const express = require("express");
const app = express();
app.connection = connection;

app.use(express.json());

consign().include('./middleware/passport').into(app);

app.listen(3333);