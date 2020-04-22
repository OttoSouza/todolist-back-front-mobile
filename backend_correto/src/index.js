const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

require('./routes/usuario')(app)
require('./routes/tarefas')(app)

app.listen(3333);
