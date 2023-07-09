//Dependencies
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

//common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    }
    catch(err){
        console.log(err)
    }
}

module.exports = logEvents;

