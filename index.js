const express = require('express')
const app = express();
const port = 8000

//use express router  i.e calling from router folder

app.use('/', require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`server failed to load : ${err}`)
    }
    console.log(`Succsessfully server is loaded : ${port}`)
})