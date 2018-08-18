var  fs = require ('fs');
var path =require('path');
var DBFFile = require('dbffile');

var files =fs.readdirSync(__dirname);

files.forEach(function(file){
  var fileName = path.basename(file, '.js');
  

  if(fileName !== 'index') {
    exports[fileName] = require('./'+ fileName);

  }
});
