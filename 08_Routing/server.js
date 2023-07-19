const express = require('express');
const app = express();
const path = require("path");
const {  logger } = require('./middleware/logEvents');
const  errorHandler  = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

//custome-middleware logger
app.use(logger);

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
app.use(cors());
//build-in middleware to handle urlencoded data
//in other words, form data: 'cotent-type: application/x-www-form-urlencoded'

app.use(express.urlencoded({ extended: false }))
//'use' [is used above routes] we often use to apply middleware to all routes comming in.

//built-in middleware for json: apply to all routes thats comein.
app.use(express.json());

//server static file: used for broken css move to public folder
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))


//app.use('/)
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if(req.accepts('json')) {
        res.json({ error: '404 Not Found'})
    }else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));


