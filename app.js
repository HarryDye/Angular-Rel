const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


// const index = require('./routes/index');
const quotes = require('./routes/quote');

const port = 3000;

const app = express();

const users = require('./routes/users');

const config = require('./config/database');

//mongodb connection to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database' + config.database);
});

//on error
mongoose.connection.on('error', () => {
  console.log('database error:' + err);
});

//Views
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

//Set Static Folder (angular 2 app)
app.use(express.static(path.join(__dirname, 'public')));

//Cors Middleware
app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//database routes
app.use('/users', users);
app.use('/quotes', quotes);

//index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//start server
app.listen(port, () => {
  console.log('Server is running on '+port);
});
