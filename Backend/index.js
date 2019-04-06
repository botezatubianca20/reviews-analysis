const express = require('express');
const jwt = require('express-jwt')
var bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

console.log('aaaaaaaaaaaaaa');