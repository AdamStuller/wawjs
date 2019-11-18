const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive

async function lsRescursive(dirName) {

  const filtered_list = dirsOnly(await ls(dirName))

  const fullPaths=filtered_list
    .map(({name}) => path.resolve(dirName, name));

  const allDone = fullPaths.map(ls)
  
  const output = await Promise.all(allDone)
    
  const files = [].concat(...output)
  return filesOnly(files).map(({ name }) => name)

}

function ls(dirName) {
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}

