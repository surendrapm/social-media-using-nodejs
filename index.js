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
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-outh2-strategy')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const custommidware = require('./config/middleware')

// setup the chat server to be used with socket.io
const chatserver = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatserver);


chatserver.listen(5000)
console.log('chat server is listening on port 5000')


// app.use(sassMiddleware({
//     src:'./assets/scss'
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'expanded',
//     prefix:'/css'
// }));

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expresslayouts);

//make the uploads part available to the browser
app.use('/uploads',express.static(__dirname +'/uploads'))

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

app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(custommidware.setFlash);


//use express router  i.e calling from router folder
app.use('/', require('./routes'))


app.listen(port,function(err){
    if(err){
        console.log(`server failed to load : ${err}`)
    }
    console.log(`Succsessfully server is loaded : ${port}`)
})