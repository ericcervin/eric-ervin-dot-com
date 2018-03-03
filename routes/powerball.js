const express = require('express');
const _ = require('lodash');
const Mustache = require('mustache');

const powerballResultTemplate = `<!DOCTYPE html>
<html lang=\"en\">
<head>
<style>table,th,td {
                               border: 1px solid black;
                               border-collapse: collapse;
                               padding: 3px;
                               text-align: center
                               }
                             td {text-align: left}
</style>
<title>Powerball</title>
</head>
<body>
<table>
<tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>pb</th></tr>
<tr>{{#row1}}<td>{{.}}</td>{{/row1}}</tr>
<tr>{{#row2}}<td>{{.}}</td>{{/row2}}</tr>
</table>
</body>
</html>`

const powerballRootTemplate = `
  <!DOCTYPE html>
  <html lang=\"en\">
  <head>
  <style>
  table,th,td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 3px;
        text-align: center
        }
  td {text-align: left}
</style>
<title>Powerball</title>
</head>
<body>
<div id=\"header\">
  <h3>Powerball</h3>
  <p>Two sets of Powerball numbers</p>
</div>
<div id=\"numbers\">
  <table>
    <thead>
      <tr><th scope=\"col\">Numbers</th></tr>
    </thead>
    <tbody>
      <tr><td><a href=\"/powerball/result\">HTML</a></td></tr>
    </tbody>
  </table>
</div>
</body>
</html>`
  

function powerballResultHTML(){return Mustache.render(powerballResultTemplate, resultObject())};
function powerballRootHTML() {return Mustache.render(powerballRootTemplate)};

function getPBRow(){
	const whiteBalls = _.take(_.shuffle(_.range(1, 70)),5);
	const powerBall = _.random(1,26);
	whiteBalls.push(powerBall);
	return whiteBalls;
}
function resultObject() {
	 const r1 = getPBRow();
	 const r2 = getPBRow();
	 return {row1: r1, row2: r2}
}

const powerball = express.Router();

powerball.get('/', (req,res) => (res.send(powerballRootHTML())));
powerball.get('/result', (req,res) => (res.send(powerballResultHTML())));

module.exports = powerball;