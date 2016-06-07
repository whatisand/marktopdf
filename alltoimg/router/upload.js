var express = require('express');
var bodyParser = require('body-parser');
var marktopdf = require('../marktopdf');
var fs = require('fs-extra');
var formidable = require('formidable');
var router = express.Router();

router.get('/', function( req, res ){
    res.sendFile('index.html');
});

router.put('/', function( req, res ){
    res.redirect('/');
});

router.delete('/', function( req, res ){
    res.redirect('/');
});


// app.post('/file-upload', function(req, res, next){
//   console.log(req.body);
//   console.log("file-upload is run");
//   console.log(req.files);
// })

router.post('/', function(req, res) {
  var form = new formidable.IncomingForm();

  form.keepExtensions = true;
  // 파일 전송 시 첫번째 chunk가 전달되면 호출
  form.on('fileBegin', function(name, file) {
    console.log('fileBegin - ' + name + ':' + JSON.stringify(file));
  })
  // 파일의 chunk가 전달될 때 마다 호출
  .on('progress', function(bytesReceived, bytesExpected) {
    console.log('progress: ' + bytesReceived + '/' + bytesExpected);
  })
  // 파일 전송도중 esc나 페이지 전환 등으로 중단될 때 호출
  .on('aborted', function() {
    console.log('aborted');
  })
  // error 발생 시 호출
  .on('error', function() {
    console.log('error');
  })
  // 파일 전송이 끝난 경우 호출
  .on('end', function(fields, files) {
    console.log('end');
    /* Temporary location of our uploaded file */
       var temp_path = this.openedFiles[0].path;
       /* The file name of the uploaded file */
       var file_name = this.openedFiles[0].name;

       /* Location where we want to copy the uploaded file */
       var new_location =__dirname+ '/../updfile/';
       fs.copy(temp_path, new_location + file_name, function(err) {

           if (err) {
               console.error(err);


           } else {
               console.log("success!" + new_location + file_name);

               if(file_name.indexOf('.md')>-1){
                  marktopdf.convertfile(file_name);
                  console.log('[Downloading] + 'new_location + file_name+'.pdf');
                  res.download(new_location + file_name+'.pdf');
                  //이부분도 작동하지 않는다
               }
               else{
                 console.log("convert fail");
                 res.send('fail and file deleted');// 이부분이 왜 안되나
                 fs.remove(new_location + file_name);

               }
           }
       });
   });
  form.parse(req, function(err, fields, files) {
    console.log('parse - ' + JSON.stringify(files));
  });
  //정보 보여주는 부분인데 쓸때가 없어서 안씀, 이거 꼭 있어야하나봐 ㄷㄷ

  //res.download('./updfile/'+filename);
  console.log('loglog');
  //이 위에 이거 왜 작동 안하는지 궁금함
  //res.send('done'); 이거 일단 주석처리하고
  //이제 변환된 파일 다운로드 해주는거 만들고, 조건에 따라서 리스폰 다르게 해주는거 찾아보면 ㅇ됨
});
module.exports = router;
