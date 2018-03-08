const express = require('express');
const _ = require('lodash');
const Mustache = require('mustache');
const sqlite3 = require('sqlite3').verbose();

const destinyRootTemplate = `
  <!DOCTYPE html>
  <html lang=\"en\">
  <head>
  <title>Destiny</title>
  <style>
  table,th,td {
                               border: 1px solid black;
                               border-collapse: collapse;
                               padding: 3px;
                               text-align: center
                               }
       td {text-align: left}
  </style>
  </head>
  <body>
  <div id=\"header\">
  <h3>Star Wars Destiny</h3>
  <br>
  </div>
  <div id=\"reports\">
  <h4>Reports</h4>
  <table>
  <tr><td>Count by Affiliation/Faction</td><td><a href="/destiny/reports">HTML</a></td></tr>
  </table>
  </div>
  </body>
  </html>
  `;
  
const destinyReportTemplate = `
  <!DOCTYPE html>
  <html lang=\"en\">
  <head>
  <title>Destiny</title>
  <style>
  table,th,td {
                               border: 1px solid black;
                               border-collapse: collapse;
                               font-size: small;
                               padding: 3px;
                               text-align: center
                               }
       td {text-align: left}
  </style>
  </head>
  <body>
  <div id=\"report\">
  <table>
  <thead>
  <tr><th>Affiliation</th><th>Faction</th><th>Count</th></tr>
  </thead>
  <tbody>
  {{#results}}<tr><td>{{affiliation}}</td><td>{{faction}}</td><td>{{count}}</td></tr>{{/results}}
  </tbody>
  </table>
  </div>
  </body>
  </html>`
  
  
function destinyQuery(req,res){
	let db = new sqlite3.Database('./db/destiny.db', (err)=>{
	if (err){console.log(err.message);}
	    console.log('connected to destiny db');
    }
	)
	
	let sql = `Select affiliation, faction, count(*) as count from card group by affiliation, faction`;

db.all(sql,(err,rows) => {
	if (err){
		throw err;
	}
	//console.log(Mustache.render(destinyReportTemplate,{results: rows}));
	res.send(Mustache.render(destinyReportTemplate,{results: rows}));
	
})
} 
function destinyRootHTML(){return Mustache.render(destinyRootTemplate)};

const destiny = express.Router();
destiny.get('/',(req,res) => {res.send(destinyRootHTML())});
destiny.get('/reports',(req,res) => {destinyQuery(req,res)});

module.exports = destiny;

/*
 
 */