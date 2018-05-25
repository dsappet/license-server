// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

// webpack middleware
const config = require('./webpack.config.js');
const compiler = webpack(config);

// configuration ===========================================

// config files
// haven't created a db yet, might not use a db but scaffold it
var db = require('./server/config/db');

// set our port
var port = process.env.PORT || 3000;

// connect to our mongoDB database
// (uncomment to use mongo and mongoose db )
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Tell express to use our webpack middleware now
app.use(webpackDevMiddleware(compiler, {publicPath:config.output.publicPath}));

// routes ==================================================
require('./server/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// display port
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;