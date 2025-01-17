const fs = require('fs')
const http = require('http')
const path = require('path')
const { pipeline } = require('stream');
const argv = require('minimist')(process.argv.slice(2));


if( argv['help'] || argv['h']){
    console.log(
        `----------------------------------------------------
-i --input-file=<file>:     inputFile: path to file
                            to be compressed. Can be 
                            passed as first arg, 
                            without switcher.
-o --output-file=<file>:    specified output file.
                            Path must be absolute
-h --help:                  Prints help
----------------------------------------------------` )
    process.exit(0)
}
    
let [ inputFile ] = argv._
inputFile = argv['i'] || argv['input-file'] || inputFile

if( inputFile == null ) {
    console.error({ message: 'File was not specified !'})
    process.exit(1)
}

const outputFile = argv['output-file'] || argv['o']
const outputStream = outputFile != null ? fs.createWriteStream(outputFile) : process.stdout

const url = "http://localhost:9999";
const request = http.request(url, {
        method: "POST"
    })

request
    .on("response", (res) => {
        if(res.statusCode !== 200){
            console.error({message: 'Error occured on server side', response: res.statusMessage})
            process.exit(1)
        }
        res.pipe(outputStream)
        .on('error', console.error)
    })
    
request.setHeader('file-name', path.basename(inputFile))

pipeline(
    fs.createReadStream( inputFile, {encoding:'utf-8'} ),
    request,
    err => {
        if(err){
            console.error({ message: 'Error occured when sending to server!', error: err})
            process.exit(1)
        }
        else{
            console.log('File successfully sent to server!')
        } 
    }
)
