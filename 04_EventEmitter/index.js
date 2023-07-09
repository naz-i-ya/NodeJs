const logEvents = require('./logEvents');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//initialize Object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log',(msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'log Event Emitted...!!!');
}, 2000)