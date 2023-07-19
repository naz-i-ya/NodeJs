//Cross Origin resource sharing
const whiteList = ['https//www.site.com', 'http://127.0.0.1:5500', 'http://localhost:8080'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){ //if domine is in the whiteList
            callback(null, true);
        }else{
            callback(new Error('Not Allowed By Cors'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions;