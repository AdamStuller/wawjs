const path = require('path')
const http = require('http')
const fs = require('fs')
const { pipeline } =require('stream')
const { createGzip} = require('zlib')

const STORAGE_DIR = path.join( __dirname , 'server-data') 
fs.existsSync(STORAGE_DIR) || fs.mkdirSync(STORAGE_DIR)

const handleError = (res) => {
    console.error({ message: 'Error occured, terminating!', error: err})
    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error'
    res.end()
    process.exit(1)
}

const handleRequest = (req, res) => {
    const storageFile = path.join(STORAGE_DIR, `${new Date().getTime()}-${req.headers['file-name']}` )

    pipeline(
        req,
        fs.createWriteStream(storageFile),
        (err) => {
            if(err) {
                handleError(res)
            }
            else{
                pipeline(
                    req,
                    createGzip(),
                    res,
                    err => {
                        if(err) handleError(res)
                        console.log('Job finished!')
                    }
                )
            }
        }
    )   
}



const startServer = () => {
    http
        .createServer()
        .listen(9999, "localhost", () => console.log('Listening on port 9999'))
        .on("request", handleRequest );
}

if(__filename === process.argv[1]){
    startServer()
}

module.exports = startServer