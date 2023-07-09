const os = require('os');
const path = require('path');
// const math = require('./math');
const { add, sub, mul, div } = require('./math');//destructure

console.log(os.type());  //Windows_NT
console.log(os.version());//Windows 10 Enterpise
console.log(os.homedir());//C:\Users\Naziya

console.log(__dirname);//give dirname
console.log(__filename);//give directoryname
//  -----OR-----
console.log(path.dirname(__filename));//dir name
console.log(path.basename(__filename));//'server.js'
console.log(path.extname(__filename));//gives just extension name '.js'

console.log(path.parse(__filename));//we get an obj of values root, dir, base, extension n file name


// console.log(math.mul(2,3));
console.log(add(2,3));
console.log(sub(2,3));
console.log(mul(2,3));
console.log(div(2,3));