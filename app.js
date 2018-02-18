const express = require('express');
const Mustache = require('mustache');
const logger = require('morgan');
const app = express();

const rootTemplate = `
 <!DOCTYPE html>
  <html lang="en">
  <head>
  <title>Eric Ervin Dot Com</title>
  <style>table,th,td {
                               border: 1px solid black;
                               border-collapse: collapse;
                               padding: 3px;
                               text-align: center
                               }
                             td {text-align: left}</style>
  </head>
  <body>
  <div id="header">
  <h1>Eric Ervin Dot Com</h1>
  <p>A toy website to release some Javascript into the world.</p>
  <p><a href="https://github.com/ericcervin/eric-ervin-dot-com">https://github.com/ericcervin/eric-ervin-dot-com</a></p>
  <br>
  </div>
  </body>
  </html>

`

app.use(logger("short"));

app.get('/',(req,res) => {res.send(Mustache.render(rootTemplate))})


app.listen(8000,() => console.log("Listening to 8000"));