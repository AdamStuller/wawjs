 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, cb) {
   const tasks = paths.map( path => function(callback){
     try{
      fs.writeFile(path, data, (err) => {
        return callback(err, path)
      })
     }
     catch(err){
       return callback(err, path)
     }  
   })
   async.tryEach(tasks, cb);
 }
