var express= require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');
var path=require('path');

var users=require('./routes/users');
var books=require('./routes/booking');
var userVerify=require('./routes/verify');

const app = express();

//connect to mongo db
mongoose.connect('mongodb+srv://admin:1234@cluster0.ehdvr.mongodb.net/booking')
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db');
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error: ',err);
    } 
})

app.use(cors()); 
app.use(bodyParser.json());

app.use('/',users);
app.use('/book',userVerify,books);


app.listen(3001, function() {
    console.log('listening on 3001')
})