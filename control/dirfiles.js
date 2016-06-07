var fs = require("fs");
var mdtopdf = require("markdown-pdf");
//var sleep = require("sleep");

var path = '../convert/to';

fs.readdir(path, function(err, files) {
  if(err) throw err;
  files.forEach(function(file) {
    if (file.indexOf('.pdf') == -1) {
      mdtopdf().from(path+"/"+file).to(path+"/"+file+".pdf");
      console.log(file+" done");
    }
  })//각각의 파일을 바로 pdf로 변환함
});//디랙토리에서 파일 찾는 부분
