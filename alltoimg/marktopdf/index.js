var fs = require("fs");
var mdtopdf = require("markdown-pdf");
//var sleep = require("sleep");

var path = __dirname +'/../updfile';

module.exports.convertfile = function(filename){
      mdtopdf().from(path+"/"+filename).to(path+"/"+filename+".pdf");
      console.log(filename + " convert done");
    }
