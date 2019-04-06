const express = require('express');

var bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var app = express();
let http = require('http').Server(app);
var db = require('./db');
// let io = require('socket.io')(http);

console.log('aaaaaaaaaaaaaa');



// module.exports = io;
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
const users = require('./controllers/users.js')
const reviews = require('./controllers/reviews.js');



// var busboy = require('connect-busboy');

app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true,
}));

// app.use(function (err, req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');
// })
// app.use(jwt({
//   secret: 'secret'
// }).unless({
//   path: ['/users/login', '/users/updateYourPassword'],
//   method: ['GET', 'POST', 'PUT']
// }));
// app.use(flash());






// // engine
// app.set('view engine', 'html');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
http.listen(3001, () => console.log('Server started at port: 3001'));

// app.use(busboy());
// app.use('/users', users)
// app.use('/reviews', reviews)


app.use('/users', users)
app.use('/reviews', reviews)

