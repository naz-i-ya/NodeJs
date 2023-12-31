//Dependencies
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

//common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    }
    catch(err){
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, 'reqLog.txt');//(msg,file)
console.log(`${req.method} ${req.path}`);
next();
}

module.exports = { logEvents, logger }

