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
  <tr><td>Count by Affiliation/Faction</td><td><a href="/destiny/reports/affiliation_faction_count">HTML</a></td></tr>
  <tr><td>Count by Rarity</td><td><a href="/destiny/reports/rarity_count">HTML</a></td></tr>
  <tr><td>Count by Set</td><td><a href="/destiny/reports/set_count">HTML</a></td></tr>
  <tr><td>Highest Cost Support/Event/Upgrade</td><td><a href="/destiny/reports/high_cost">HTML</a></td></tr>
  <tr><td>Rarity Legendary Cards</td><td><a href="/destiny/reports/legendary">HTML</a></td></tr>
  <tr><td>Rarity Rare Cards</td><td><a href="/destiny/reports/rare">HTML</a></td></tr>
  <tr><td>Type Character Cards</td><td><a href="/destiny/reports/type_character">HTML</a></td></tr>
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
  <tr>{{#header}}<th>{{.}}</th>{{/header}}</tr>
  </thead>
  <tbody>
  {{#results}}<tr>{{#result}}<td>{{.}}</td>{{/result}}</tr>{{/results}}
  </tbody>
  </table>
  </div>
  </body>
  </html>`
  
function destinyReport(req,res,id){
	switch(id){
		case "affiliation_faction_count": 
            destinyQuery(req,res,{header: ["Affilliation", "Faction", "Count"],
                                  query: "Select affiliation, faction, count(*) as count from card group by affiliation, faction"});
						  break;
		case "rarity_count":
            destinyQuery(req,res,{header: ["Rarity", "Count"], 
                                   query: "Select rarity, count(*) as count from card group by rarity"});
						  break;
		case "set_count":
            destinyQuery(req,res,{header: ["Set", "Count"], 
                                   query: "Select cardset, count(*) as count from card group by cardset"});
						  break;
		case "high_cost":
            destinyQuery(req,res,{header: ["Set", "Pos", "Name", "Type", "Is Unique", "Rarity", "Cost", "Sides", "Image"],
                                  query: "Select cardsetcode, position, name, typename, isunique, raritycode, ccost, csides, imgsrc from card where ccost is not null order by ccost desc"});
						  break;
		case "legendary":
            destinyQuery(req,res,{header: ["Set", "Pos", "Name", "Type", "Affilliation", "Faction", "Is Unique", "Rarity", "Cost", "Sides", "Image"],
                                  query: "Select cardsetcode, position, name, typename, affiliation, factioncode, isunique, raritycode, ccost, csides, imgsrc from card where rarity = \"Legendary\""});
						  break;
						  
		case "rare":
            destinyQuery(req,res,{header: ["Set", "Pos", "Name", "Type", "Affilliation", "Faction", "Is Unique", "Rarity", "Cost", "Sides", "Image"], 
                                query: "Select cardsetcode, position, name, typename, affiliation, factioncode, isunique, raritycode, ccost, csides, imgsrc from card where rarity = \"Rare\""});
						  break;
		
		case "type_character":
            destinyQuery(req,res,{header: ["Set", "Pos", "Name", "Type", "Affilliation", "Faction", "Is Unique", "Rarity", "MinPoints", "MaxPoints", "Health", "Sides", "Image"], 
                                query: "Select cardsetcode, position, name, typename, affiliation, factioncode, isunique, raritycode, cminpoints, cmaxpoints, chealth, csides, imgsrc from card where typename = \"Character\""});
						  break;
						  
		default:
		      res.status(404).send("<!DOCTYPE html><html lang=\"en\"><head><title>404</title></head><body><p><strong>404 not found</strong></body></html>")
						  break;
		
	}
	
}
  
  
function destinyQuery(req,res,obj){
	let db = new sqlite3.Database('./db/destiny.db', (err)=>{
	if (err){console.log(err.message);}
	    console.log('connected to destiny db');
    }
	)
	
	let sql = obj.query;

db.all(sql,(err,rows) => {
	if (err){
		throw err;
	}
	
	rows = rows.map((x)=>{return {result: Object.values(x)}})
	res.send(Mustache.render(destinyReportTemplate,{header: obj.header, results: rows}));
	
})
} 
function destinyRootHTML(){return Mustache.render(destinyRootTemplate)};

const destiny = express.Router();
destiny.get('/',(req,res) => {res.send(destinyRootHTML())});
destiny.get('/reports/:id',(req,res) => {destinyReport(req,res,req.params.id)});


module.exports = destiny;
