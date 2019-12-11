const { spawn } = require('child_process');
const path = require('path')

const server = spawn('node', [path.join(path.dirname(process.argv[1]), '..', 'zip-server.js')])
server.stdout.on('data', (data) => {
    console.log('STDOUT/server:', data.toString())
});
server.stderr.on('data', (data) => {
    console.log('STDERR/server:', data.toString())
});


const client = spawn('node', [
    path.join(path.dirname(process.argv[1]), '..', 'zip-client.js'),
    path.join(path.dirname(process.argv[1]), '..','client-data', 'cvicenie10.pptx'), 
    `--output-file=${path.join(path.dirname(process.argv[1]), '..','client-data', 'pptx_archive.zip')}`
])
client.stdout.on('data', (data) => {
    console.log('STDOUT/client:', data.toString())
});
client.stderr.on('data', (data) => {
    console.log('STDERR/client:', data.toString())
});