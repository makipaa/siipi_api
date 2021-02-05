const http = require('http');
const { setPriority } = require('os');
const {handleRequest} = require('./routes.js');

const PORT = 3000;
const server = http.createServer(handleRequest);

server.on('error', err => {
    console.error(err);
    server.close();
});

server.on('close', () => 
{
    console.log('Server closed.');
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});