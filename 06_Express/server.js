const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.get('^/$|/index.html', (req, res) => {   //it will also route to index.html by typing '/' n 'index.html'. without.html wont work..Express automatically sets status code 404 n content type.
    //'/'                  ---OR-- 
    // '^/$|/index.html'   ----OR---
    //  making .html optional: '^/$|/index(.html)?'
   
    // res.sendFile('./views/index.html', {root: __dirname});
    // --------OR--------
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

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));


