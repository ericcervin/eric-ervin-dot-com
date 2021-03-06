const express = require('express');
const Mustache = require('mustache');
const logger = require('morgan');
const app = express();

const root = require('./routes/root');
const destiny = require('./routes/destiny');
const serialism = require('./routes/serialism');
const powerball = require('./routes/powerball');

app.use(logger("short"));

app.use('/',root);
app.use('/destiny',destiny);
app.use('/powerball',powerball);
app.use('/serialism',serialism);
app.use(function(req,res) {res.status(404).send(`<!DOCTYPE html>
              <html lang="en">
              <head>
              <title>Error 404 Not Found</title>
              </head>
              <body>404 - Not Found</body></html>`)});

app.listen(80,() => console.log("Listening to 80"));