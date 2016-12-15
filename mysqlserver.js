var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'awadesh2294'
});

connection.query('USE test');

app.set('port', 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  connection.query('SELECT * FROM movie', function(err, rows){
	  console.log("rows: ", rows);
	 // res.send(200, rows);
  res.render('index');
  });
});
app.get('/user', function(req, res){
  connection.query('SELECT * FROM movie', function(err, rows){
	   rows = JSON.stringify(rows);
            rows = JSON.parse(rows);
			console.log("rows: ", rows);
	res.send(rows);
	
  });
});
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));