const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'civicconnect',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/',       (req, res) => res.render('home'));
app.get('/login',  (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/report', (req, res) => res.render('report'));
app.get('/map',    (req, res) => res.render('map'));

// Classify + store in session
app.post('/report/classify', async (req, res) => {
    const { complaint, lat, lng } = req.body;

    try {
        const response = await fetch('http://localhost:8000/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaint })
        });

        const result = await response.json();

        // Save everything in session
        req.session.result = {
            ...result,
            complaint,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };

        // Save to complaints list for map
        if (!req.session.complaints) req.session.complaints = [];
        req.session.complaints.push(req.session.result);

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: 'Classifier unavailable' });
    }
});

// Status page
app.get('/status', (req, res) => {
    const result = req.session.result;
    if (!result) return res.redirect('/report');
    res.render('status', { result });
});

// API for map to fetch all complaints
app.get('/api/complaints', (req, res) => {
    const complaints = req.session.complaints || [];
    res.json(complaints);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));