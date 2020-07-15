const express = require('express');
const env = require('./config/environment');
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
const sellerPassport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path');


// if(env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));   


app.use(express.urlencoded());

app.use(cookieParser());


// assets
app.use(express.static(env.asset_path));

app.use('/uploads', express.static(__dirname + '/uploads'));

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
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 240 * 10)
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