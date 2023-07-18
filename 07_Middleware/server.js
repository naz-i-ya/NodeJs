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
app.use(express.static(path.join(__dirname, '/public')))

app.get('^/$|/index.html', (req, res) => {   
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');//it send 302 by default so specify 301
});

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
},(req, res) => {
    res.send('Hello Naziya');
})

//chaining route handlers it work llr to middleware.
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    next();
    res.send('Finished');
}

app.get('/chain(.html)?', [one, two, three]);

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


