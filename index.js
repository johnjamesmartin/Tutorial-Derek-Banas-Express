var express = require('express');
var app = express();


/* Disable 'x-powered-by' for a more discreet header: */

app.disable('x-powered-by');


/* Set Handlebars as is our viewing engine: */

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


/* Use port of host environment or default to port 3000: */

app.set('port', process.env.PORT || 3000);


/* Have resources sourced from public directory */

app.use(express.static(__dirname + '/public'));


/* Root route: */

app.get('/', function(req, res) {
    res.render('home');
});


/* About route: */

app.get('/about', function(req, res) {
    res.render('about');
});


/* Middleware function: */

app.use(function(req, res, next) {
    console.log('Looking for: ' + req.url);
    next();
});


/* Report and throw errors like so: */

app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk does\'t exist');
});


/* Catches the error, log it and continue pipeline: */

app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});


/* Handle 404: */

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});


/* Handle 500: */

app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});


/* Listen for port and offer feedback: */

app.listen(app.get('port'), function() {
    console.log('Express started. Press CTRL + C to terminate')
});