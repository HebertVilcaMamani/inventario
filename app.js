var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');

var passport =require('passport');
var officegen = require('officegen');

require('./passport/passport')(passport);
var routes = require('./routes/routes');
var session =require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();
var formidable = require('express-formidable');
var DBFFile  = require( 'dbffile' );



app.use(function(err, req, res, next) {
res.render('home.ejs', { link: "192.168.0.10:1" });
});
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized :false
}));
app.use(flash());
app.use(formidable.parse({keepExtensions:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

// boostrap  las rutas del  frameworck
app.use('/boostrap', express.static(__dirname + '/public/boostrap'));
app.use('/cssFiles', express.static(__dirname + '/public/stylesheets'));
// subir imagenes
app.use('/imgFiles', express.static(__dirname + '/public/images'));
// usar angular  js
app.use('/angu', express.static(__dirname + '/public/bower_components/angular'));
// usando  javascrit la version 2.1.4
app.use('/javas', express.static(__dirname + '/public/javascripts'));
//  aver si funca login
app.use('/angularjs', express.static(__dirname + '/public/angularjs'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
