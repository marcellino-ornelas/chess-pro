/*
 * Modules
*/

const http = require('http'),
      path = require('path'),
      express = require('express'),
      routes = require('./routes'),
      game = require('./game'),
      // socket = require('socket.io'),
      passport = require('passport'),
      User = require('./models/User'),
      flash = require('connect-flash'),
      bodyParser = require('body-parser'),
      session = require('express-session')
      middleware = require('./routes/middleware'),
      cookieParser = require('cookie-parser'),
      methodOverride = require('method-override'),
      LocalStrategy = require('passport-local').Strategy;

/*
 * Create the app
*/
const app = express();
const server = http.createServer(app);


const io = game.initialize( server );

/*
 * App config
*/
app.set( 'view engine', 'pug' );
app.set( 'views', 'views/pages' );

const PORT = process.env.PORT || 3000;


/*
 * Middleware
*/
// console.log(process.env.NODE_ENV)
// const isInDevelopment = (process.env.NODE_ENV || 'dev') === 'dev';

// router.use( less( process.cwd() + '/less', {  force: true }) );
app.use( express.static(__dirname + '/public') );

// assign signed in user to locals for template use
app.use( bodyParser.urlencoded({ extended: true }) );


app.use( methodOverride('_method') );

app.use( cookieParser() );

app.use(session({
  secret: 'whereismarcellino',
  resave: false,
  saveUninitialized: false
}));

// flash messages
app.use( flash() );

/*
 * Passport Config
*/
app.use( passport.initialize() );
app.use( passport.session() );

// passport config
passport.use( User.createStrategy() );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );


/*
 * Routes
*/
app.use( routes );

server.listen( PORT, function(){
  console.log('server is running on port 3000');
});
