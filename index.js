const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const port = 4000
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const custommidware = require('./config/middleware')
// app.use(sassMiddleware({
//     src:'./assets/scss'
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'expanded',
//     prefix:'/css'
// }));

app.use(express.urlencoded())
app.use(cookieParser());
app.use(expresslayouts);

//extract stylr and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router  i.e calling from router folder
app.use(express.static('./assests'))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used store the session cookie
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore({
        
             mongooseConnection:db,
            autoRemove:'disabled'
        
    },
    function(err){
        console.log(err || 'connect mongodb-setup ok');
    }
    
    )
      
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(custommidware.setFlash);
app.use(passport.setAuthenticatedUser)

//use express router  i.e calling from router folder
app.use('/', require('./routes'))


app.listen(port,function(err){
    if(err){
        console.log(`server failed to load : ${err}`)
    }
    console.log(`Succsessfully server is loaded : ${port}`)
})