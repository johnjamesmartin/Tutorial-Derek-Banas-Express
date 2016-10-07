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

/* Listen for port and offer feedback: */

app.listen(app.get('port'), function() {
    console.log('Express started. Press CTRL + C to terminate')
});