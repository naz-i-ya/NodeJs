const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
console.log(uuid());
//^ majorversion.minorversion.patch: update to the minorversion n patch not majorversion
//majorversion.minorversion.patch: only this version work
//~ majorversion.minorversion.patch: update patch version not minor version
//'*': use absolute latest version evrytime