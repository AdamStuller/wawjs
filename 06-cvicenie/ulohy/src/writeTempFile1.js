module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");


function writeTempFile(fileName, ...args) {
  // just hints:
  const cb = args.pop();

  const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
  fs.mkdtemp(tempDir, (err, folder) => {  
    if(err) return cb(err, null)
    const tempFile = path.join(folder, fileName); 
    try{
      fs.writeFile(tempFile, ...args, (err) => {
        return cb(err, tempFile)
      })
    }
    catch(err){
      cb(err)
    }
  })
         
}