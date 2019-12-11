const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

console.log(bom.remove)

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("BOM removed from Buffer if in buffer", function(done) {

    let file = `${__dirname}/data/with-bom.txt`;
    //content of the file is: // with
    fs.createReadStream(file)
        .pipe(bom.remove())
        .on("error", done)
        .on("end", done)
        // TODO: naive, do not assert all chunk is received
        .once("data", (chunk) => {

          assert(Buffer.isBuffer(chunk));
          // const first_expected = Buffer.from([
          //   0xef, 0xbb, 0xbf, // utf8 bom
          //   0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68
          // ])
          console.log(chunk)
          // ef bb bf 2f 2f 20 77 69 74 68
          //          /  /     w  i  t  h 
          const expected = Buffer.from([
            // no bom
            0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68
          ]);
          assert(chunk.equals(expected));
        })
  });

  it("File without BOM stays without BOM", function(done) {

    let file = `${__dirname}/data/without-bom.txt`;
    //content of the file is: // with
    fs.createReadStream(file)
        .pipe(bom.remove())
        .on("error", done)
        .on("end", done)
        // TODO: naive, do not assert all chunk is received
        .once("data", (chunk) => {

          assert(Buffer.isBuffer(chunk));
          console.log(chunk)
          // ef bb bf 2f 2f 20 77 69 74 68
          //          /  /     w  i  t  h 
          const expected = Buffer.from([
            // no bom
            0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68,0x6f, 0x75, 0x74
          ]);
          assert(chunk.equals(expected));
        })
  });


  it("Empty file without bom... nothing happens", function(done) {

    let file = `${__dirname}/data/without-bom-empty.txt`;
    //content of the file is: // with
    fs.createReadStream(file)
        .pipe(bom.remove())
        .on("error", done)
        .on("end", done)
        // TODO: naive, do not assert all chunk is received
        .once("data", (chunk) => {

          assert(Buffer.isBuffer(chunk));
          console.log(chunk)
          // ef bb bf 2f 2f 20 77 69 74 68
          //          /  /     w  i  t  h 
          const expected = Buffer.from([
            // no bom
            // 0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68,0x6f, 0x75, 0x74
          ]);
          assert(chunk.equals(expected));
        })
  });

  it("BOM removed wit size 2 of chunks", function(done) {
    const chunks = []
    let file = `${__dirname}/data/without-bom.txt`;
    //content of the file is: // with
    fs.createReadStream(file, { highWaterMark: 2 })
        .pipe(bom.remove())
        .on("error", done)
        .on("end", done)
        // TODO: naive, do not assert all chunk is received
        .on("data", (chunk) => {
          chunks.push(chunk)
        })
        .on('finish', () => {
          const chunk =Buffer.concat(chunks)
          assert(Buffer.isBuffer(chunk));
          console.log(chunk)
          // ef bb bf 2f 2f 20 77 69 74 68
          //          /  /     w  i  t  h 
          const expected = Buffer.from([
            // no bom
            0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68,0x6f, 0x75, 0x74
          ]);
          assert(chunk.equals(expected));
        })
  });

  it("BOM removed wit size 1 of chunks", function(done) {
    const chunks = []
    let file = `${__dirname}/data/without-bom.txt`;
    //content of the file is: // with
    fs.createReadStream(file, { highWaterMark: 1 })
        .pipe(bom.remove())
        .on("error", done)
        .on("end", done)
        // TODO: naive, do not assert all chunk is received
        .on("data", (chunk) => {
          chunks.push(chunk)
        })
        .on('finish', () => {
          const chunk =Buffer.concat(chunks)
          assert(Buffer.isBuffer(chunk));
          console.log(chunk)
          // ef bb bf 2f 2f 20 77 69 74 68
          //          /  /     w  i  t  h 
          const expected = Buffer.from([
            // no bom
            0x2f, 0x2f, 0x20, 0x77, 0x69, 0x74, 0x68,0x6f, 0x75, 0x74
          ]);
          assert(chunk.equals(expected));
        })
  });


});