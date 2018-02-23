const express = require('express');
const Mustache = require('mustache');
const logger = require('morgan');
const app = express();

const serialHTML = require('./serialism');
const powerballHTML = require('./powerball');

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
  <div id="resources">
  <table>
  <thead><tr><th scope="col">Resource</th><th scope="col">Description</th><th scope="col">Data Updated</th></tr></thead>
  <tbody>
  <tr><td><a href="/powerball">Powerball</a></td><td>A source for Powerball numbers to play</td><td>N/A</td></tr>
  <tr><td><a href="/serialism">Serialism</a></td><td>Toying with set theory and dodecaphony</td><td>N/A</td></tr>
  </tbody>
  </table>
  </div>
  </body>
  </html>

`


app.use(logger("short"));

app.get('/',(req,res) => {res.send(Mustache.render(rootTemplate))});
app.get('/serialism',(req,res) => (res.send(serialHTML())));
app.get('/powerball',(req,res) => (res.send(powerballHTML())));

app.use(function(req,res) {res.status(404).send("<!DOCTYPE html><html lang=\"en\"><head><title>404</title></head><body><p><strong>404 not found</strong></body></html>")});

app.listen(8000,() => console.log("Listening to 8000"));