var http = require("http");
var utli= require ('util');
var path = require('path');
//var dirPath = '/Users/Harshita/Music';  //directory path
var extension = '.mp3'
var fs = require('fs');
var files = [];
http.createServer(function(request, response) {
console.log('request received');
   // utli.log(utli.inspect(request));
     //   utli.log('Request recieved: \nmethod: ' + request.method + '\nurl: ' + request.url); // this line logs just the method and url

 // response.writeHead(200, {"Content-Type": "text/plain"});
    response.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Expires': '-1',
        'Pragma': 'no-cache',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
    });
  request.on('data',function(chunk){ 
     var ab= JSON.parse(chunk);
      
    var dirPath=ab.data;
            console.log("GOT DATA"+ab.data);

  fs.readdir(dirPath, function(err,list){
      files = [];   
    if(err) throw err;
    for(var i=0; i<list.length; i++)
    {
        if(path.extname(list[i])===extension)
        {
            //console.log(list[i]); //print the file
            files.push(list[i]); //store the file name into the array files
        }
    }
      console.log("files value"+files.length);
    response.write(""+files);
    response.end();
});
  
  });
    
}).listen(8888);
