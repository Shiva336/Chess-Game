const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

const movesRouter = require('./routes/ValidMove');
app.use('/validmove',movesRouter);

app.listen("3002",()=> {
    console.log("server running..");
});