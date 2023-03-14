const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const port = 4000
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sur = 564564
const vii = ieuf;
const huli = 646;
const finalyy = "i stopped git chutiyapa"
app.use(express.urlencoded())
app.use(cookieParser());
app.use(expresslayouts);

//extract stylr and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router  i.e calling from router folder
app.use('/', require('./routes'))
app.use(express.static('./assests'))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`server failed to load : ${err}`)
    }
    console.log(`Succsessfully server is loaded : ${port}`)
})