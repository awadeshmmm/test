var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })


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
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
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
app.post('/',upload.any(),function (req, res, next) {
	res.send(req.files);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.post('/createMovie', function(req, res) {
	// var data = JSON.parse(req.body);
     var responseJson = JSON.stringify(req.body);
     console.log(req.body);
      connection.query('insert into movie values(?,?,?)',[req.body.id,req.body.name,req.body.type], function(err, rows){
	  if (err) {
		  console.log(err);
          res.send({status: 1, message: 'movie creation failed'});
        } else {
          res.send({status: 0, message: 'movie created successfully'});
        }
      });
  });


app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));