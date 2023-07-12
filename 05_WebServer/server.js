const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));


const PORT = process.env.PORT || 8080;

const serveFile = async (filePath, contentType, response) => {
    try{
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf-8' : ''
            );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 400 : 200,
             { 'Content-Type': contentType}
             );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }
    catch(err){
        console.log(err);
        myEmitter.emit('log', `{err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `{req.url}\t${req.method}`, 'reqLog.txt');

  // let filePath;
  /*if(req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            res.end(data)
        });
    }*/

  /*switch(req.url) {
        case '/': 
        res.statusCode = 200;;
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            res.end(data)
        });
        break;
    }*/

  const extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case '.js':
        contentType = 'text/javascript';
        break;

    case '.json':
        contentType = 'application/json';
        break;

    case '.jpg':
        contentType = 'image/jpg';
        break;

    case '.txt':
        contentType = 'text/plain';
        break;

    default:
        contentType = 'text/html';
  }

  let filePath = contentType === 'text/html' && req.url === '/' ?
                path.join(__dirname, "views", 'index.html')  : 
                contentType === 'text/html' && req.url.slice(-1) === '/' ?//if last character in the req url is '/'
                path.join(__dirname, "views", req.url, 'index.html') : //also need req url specify sub directory
                contentType === 'text/html' ?
                path.join(__dirname, "views", req.url) : //whatevr was reqested in views folder, html should b
                path.join(__dirname, req.url); //this could b css, img or other folder that specified in req url

    
    //make .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/' ) filePath += '.html'; //if no slash in url

    const fileExits = fs.existsSync(filePath); //return true if file exist
    if(fileExits) {
        serveFile(filePath, contentType, res);
    }else{
        switch(path.parse(filePath).base){
            case 'naziya.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;

            case 'www-naziya.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;

            default: 
                //serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

// const myEmitter = new Emitter();

