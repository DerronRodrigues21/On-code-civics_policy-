const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({      // To save complain in sessson
    secret: 'civicconnect',
    resave: false,
    saveUninitialized: true
}));

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


// Hnadling the requests - risbern
app.post('/report/classify', async (req, res) => {
    const { complaint } = req.body;

    try {
        const response = await fetch('http://localhost:8000/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaint })
        });

        const result = await response.json();

        // Store in session - rsbrn
        req.session.result = result;
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: 'Classifier unavailable' });
    }
});

// risbern - status edited
app.get('/status', (req, res) => {
    const result = req.session.result;

    if (!result) {
        return res.redirect('/report'); // no result, send back
    }

    res.render('status', { result });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));