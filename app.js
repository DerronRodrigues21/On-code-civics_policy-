const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/report',(req,res)=>{
    res.render('report');
});

app.get('/status',(req,res)=>{
    res.render('status');
});

app.listen(3000);