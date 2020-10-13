var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var csurf = require('csurf');
const MongoStore = require('connect-mongo')(session);
var apiRoutes = require('./apiRoutes');
var { connect, getclient, env } = require('./config');

var app = express();

app.use(cookieParser());

app.use(bodyParser.json());

if(env === 'prod') {
  app.use(csurf({ cookie: true }));
  app.all('*', function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return next();
  });
}

app.use(express.static(path.join(__dirname, "build")));

connect()
.then(function() {
  app.use(session( {
    secret: 'edamantinum',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ client: getclient(), dbName: 'edamantinum' }),
  }));

  app.use('/api', apiRoutes);

  app.listen(80);
  console.log('server is listening');
})
.catch((err) => {
  console.log(err);
});

