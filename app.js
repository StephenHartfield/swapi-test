var express = require('express');
var app = express();
var router = require('./routes/router')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
    //can restrict, making '*' the url of website ex: 'http://heartoftheartisan.com'
    res.header('Access-Control-Allow-Origin', '*');
    //could make headers allow : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

app.use(router);

console.log("Simple API Gateway run on localhost:4000")

app.listen(4000);
