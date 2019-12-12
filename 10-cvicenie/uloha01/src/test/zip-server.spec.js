const assert = require("assert");
const path = require('path')
const fs = require('fs')

describe("Gzip tests", async function() {

  it("Servec can start itself", async function(done) {

    const startServer = require('./../zip-server')
    const gZipFile = require('./../zip-client')

    startServer()
    const inputStream = 
      fs.createReadStream( path.join(__dirname, '..', 'client-data', 'file.txt'), {encoding:'utf-8'} )
        .on('error', (err) => {
            console.error({ message: 'Problem with input file', error: err})
            process.exit(1)
        })

    gZipFile(inputStream, process.stdout, 'hoco')


  });
});