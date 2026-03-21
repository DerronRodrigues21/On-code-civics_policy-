process.loadEnvFile?.();

const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

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


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};


startServer();
