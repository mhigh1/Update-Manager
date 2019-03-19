/* --------------Required pachages------------------- */
const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const exphbs = require('express-handlebars');
const hbsHelpers = require('./lib/hbsHelpers');
var flash    = require('connect-flash');
const helmet = require('helmet');

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* -------------Helmet.js-------------- */

//Helmet has been initialized in express middleware and will set various HTTP headers to help protect your app.
app.use(helmet());

//Sets four HTTP headers top prevent loading cached versions of files: Cache-Control, Surrogate-Control, Pragma, and Expires
app.use(helmet.noCache());

//Helmet’s HSTS set the Strict-Transport-Security header.
const sixtyDaysInSeconds = 5184000;

//forces browsers to use the https protocol for the website
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}));

//Hides express server's default x-powered-by header, which can be used by attackers to penetrate the server
app.disable('x-powered-by');

//prevents clickjacking using frame or iframe
app.use(helmet.frameguard({
  action: 'deny'
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //adds a header which will enable CORS
  next();
});

/* -------------Passport-------------- */
app.use(
  session({ secret: 'rHUyjs6RmVOD06OdOTsVAyUUCxVXaWci', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session
// Handlebars


/* -----------Handlebars---------------- */
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'default',
  helpers: hbsHelpers,
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

  /* ----Models---- */
const models = require('./models');

 /* ----Express static assets---- */
app.use(express.static(__dirname + "/public"));

 /* -------Routes--------- */
const authRoute = require('./routes/auth.js')(app, passport);
require('./routes/api-routes')(app);

 /* ---------Load passport strategies-------- */
require('./config/passport/passport.js')(passport, models.user);

 /* --------Sync Database------------ */
 var PORT = process.env.PORT || 3000;
 
models.sequelize
  .sync()
  .then(function () {
    console.log('Database Connected');

    app.listen(PORT, function (err) {
      if (!err) console.log('Connected at http://localhost:3000');
      else console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err, 'Error on Database Sync. Please try again!');
  });

  module.exports =app;