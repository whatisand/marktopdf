var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');


var app = express();

app.use(bodyParser.json());

var upload = require('./router/upload.js');

app.use('/upload', upload);
app.use(express.static('views'));

var server = app.listen(2000, function (){
  console.log('[mdtopdf]server is working');
});
