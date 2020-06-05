const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const flash = require('connect-flash');
// Custom Middleware
const customMware = require('./config/middleware');
// passport authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());

app.use(cookieParser());


// assets
app.use(express.static('./assets'));

// extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts);  // before routes as views will be used in it to render

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'shopkart',
    secret: '*****',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled',

        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// use express router
app.use('/', require('./routes'));


app.listen(8000, (err) => {
    if (err) { console.log(`Error in running the server: ${err}`); return }

    console.log('Server is running on port 8000');
})