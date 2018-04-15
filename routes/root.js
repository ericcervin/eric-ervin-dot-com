const express = require('express');
const _ = require('lodash');
const Mustache = require('mustache');

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
  <p>A toy website to release some JavaScript into the world.</p>
  <p>Though it's a toy, these are resources I use. (Except that I've quit playing Powerball)</p>
  <p>There is a (twin) sister site written in Clojure: <a href = "http://ericervin.org">http://ericervin.org</a>
  <p><a href="https://github.com/ericcervin/eric-ervin-dot-com">https://github.com/ericcervin/eric-ervin-dot-com</a></p>
  <br>
  </div>
  <div id="resources">
  <table>
  <thead><tr><th scope="col">Resource</th><th scope="col">Description</th><th scope="col">Data Updated</th></tr></thead>
  <tbody>
  <tr><td><a href="/destiny">Destiny</a></td><td>Star Wars Destiny card game data</td><td>03/16/2018</td></tr>
  <tr><td><a href="/powerball">Powerball</a></td><td>A source for Powerball numbers to play</td><td>N/A</td></tr>
  <tr><td><a href="/serialism">Serialism</a></td><td>Toying with set theory and dodecaphony</td><td>N/A</td></tr>
  </tbody>
  </table>
  </div>
  </body>
  </html>

`

function rootHTML(){return Mustache.render(rootTemplate)};

const root = express.Router();
root.get('/',(req,res) => {res.send(rootHTML())});
root.get('/robots.txt', function(req,res) { 
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
})
module.exports = root;