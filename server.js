const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing (CORS)
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200

};

app.use(cors(corsOptions));

// Buil in middleware to handle urlencoded data
// in other words, form data:
// 'Content-Type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Built in middleware for json
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));


app.get(/^.*$/ , (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json( { error: "404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found")
    }
});

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
