require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const Complaint = require('./models/complaint-model');

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

// Page routes
app.get('/',       (req, res) => res.render('home'));
app.get('/login',  (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/report', (req, res) => res.render('report'));
app.get('/map',    (req, res) => res.render('map'));

// Classifier route
app.post('/report/classify', async (req, res) => {
    const { complaint, lat, lng } = req.body;
    try {
        const response = await fetch('http://localhost:8000/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaint })
        });
        const result = await response.json();

        const ticketId = 'CIV' + Math.floor(1000 + Math.random() * 9000);

        await Complaint.create({
            complaint,
            department: result.department,
            category:   result.category,
            priority:   result.priority,
            summary:    result.summary,
            lat:        parseFloat(lat) || 0,
            lng:        parseFloat(lng) || 0,
            ticketId
        });

        req.session.result = { ...result, complaint, lat, lng, ticketId };
        if (!req.session.complaints) req.session.complaints = [];
        req.session.complaints.push(req.session.result);

        res.json({ ...result, ticketId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Classifier unavailable' });
    }
});

// Status route
app.get('/status', (req, res) => {
    const result = req.session.result;
    if (!result) return res.redirect('/report');
    res.render('status', { result });
});

// Map API
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find({}, 'complaint department category priority summary lat lng ticketId createdAt');
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch complaints' });
    }
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