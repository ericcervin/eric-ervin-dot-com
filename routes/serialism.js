const express = require('express');
const _ = require('lodash');
const Mustache = require('mustache');

const serialTemplate = `<!DOCTYPE html>
                  <html lang=\"en\">
                 <head>  
                 <style> table,th,td {
                      border: 1px solid black;
                      border-collapse: collapse;
                      padding: 3px;
                      text-align: center;}
                               
                 td {text-align: left}
                 </style>
	             <title>Serialism</title>
                 </head>
                 <body>
                 <table>
                 <tbody>
                 <tr><th>p0</th>{{#p0}}<td>{{.}}</td>{{/p0}}</tr>
				 <tr><th>r0</th>{{#r0}}<td>{{.}}</td>{{/r0}}</tr>
				 <tr><th>i0</th>{{#i0}}<td>{{.}}</td>{{/i0}}</tr>
				 <tr><th>ri0</th>{{#ri0}}<td>{{.}}</td>{{/ri0}}</tr>
                 </tbody>
                 </table>
                 </body>
                 </html>`
	  

	
function randomDodecaRow() {return _.shuffle(_.range(12))};

function absolutePitchClass(cl)
                 {
			     if (cl < 0) {cl += 12};
				 return cl;
				 }
				 
const retrograde = (rw) => {
	row =  rw.map((x) => x);
	return _.reverse(row)}

function shiftToZero(rw){
     const dst = rw[0];
     let row = rw.map((x) => x - dst);
	 row = row.map((x) => absolutePitchClass(x));
	 return row;
}

function invert(cl){
	if (cl !== 0) {cl = 12 - cl};
	return cl
}

function invertRow (rw) {return _.map(rw,invert)};

function serialObject() {
	const p0 = shiftToZero(randomDodecaRow());
    const r0 = retrograde(p0);
    const i0 = invertRow(p0);
    const ri0 = invertRow(r0);
    return {p0: p0, r0: r0, i0: i0, ri0: ri0}
}

function serialHTML(){return Mustache.render(serialTemplate,serialObject())};

const serialism = express.Router();

serialism.get('/',(req,res) => (res.send(serialHTML())));

module.exports = serialism;