const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var app = express();
let http = require('http').Server(app);
var logger = require('morgan');
const users = require('./controllers/users.js')
const reviews = require('./controllers/reviews.js');

app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

http.listen(3001, () => console.log('Server started at port: 3001'));


app.use('/users', users)
app.use('/reviews', reviews)

