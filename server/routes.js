const path = require('path');
const fs = require('fs');

const queueNumber = 12;

const renderPublic = (filePath, response) => {
  const ext = splitPath(filePath);
  const contentType = getContentType(ext);
  const fullPath = getFullFilePath(filePath);
  renderFile(fullPath, contentType, response)
}

const splitPath = filePath => {
    const tmpPath = filePath.split('?')[0];
    const filename = path.basename(tmpPath);
    const ext = path.extname(filename);
    return ext;
  };
  
  const renderFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.statusCode = 500;
        if (error.code === 'ENOENT') {
          // console.error(`File does not exist: ${filePath}`);
          response.statusCode = 404;
        } else if (error.code === 'EACCES') {
          console.error(`Cannot read file: ${filePath}`);
        } else {
          console.error(
            'Failed to read file: %s. Received the following error: %s: %s ',
            filePath,
            error.code,
            error.message
          );
        }
  
        return response.end();
      }
  
      const status = 200;
      response.writeHead(status, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    });
  };
  
  const getFullFilePath = fileName => {
    const basePath = 'html';
    return path.resolve(
      __dirname,
      `../${basePath}/${fileName[0] === '/' ? fileName.substring(1) : fileName}`
    );
  };
  
  const getContentType = fileExtension => {
    let contentType = 'text/html';
  
    switch (fileExtension.toLowerCase().replace('.', '')) {
      case 'js':
      contentType = 'text/javascript';
      break;

      case 'json':
        contentType = 'application/json';
        break;
      default:
        contentType = 'text/html';
    }
  
    return contentType;
  };
  
  const acceptsJson = request => {
    const accepted = request.headers['accept'];
    if(typeof accepted !== 'string'){
      return false;
    }
    return accepted.includes('application/json') || accepted.includes('*/*');
  
  }

const handleRequest = async (request, response) => {
    const {url, method, headers} = request;
    const filePath = new URL(url,`http://${headers.host}`).pathname;
    console.log(filePath);
    if(method.toUpperCase() === 'GET' && filePath === '/public/front.js')
    {
        const fileName = "../public/front.js";

        return renderPublic(fileName, response);
    }   
    if(method.toUpperCase() === 'GET' && !filePath.startsWith('/api'))
    {
        const fileName = "../html/index.html";

        return renderPublic(fileName, response);
    }

    else if(method.toUpperCase() === 'GET' && filePath === '/api/queue' )
    {   
        response.writeHead(200, {'Content-Type' : 'application/json'});
        response.end(JSON.stringify(queueNumber));
    }
    else {
        console.log('eipä ollut');
        response.writeHead(404);
        response.end();
    }
}

module.exports = {handleRequest};