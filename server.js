const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;


// Custom middleware logger
app.use(logger);

// Handle options credentials check - BEFORE CORS!
// and fetch cookies credentials requirenment
app.use(credentials);

// Cross Origin Resource Sharing (CORS)
app.use(cors(corsOptions));

// Buil in middleware to handle urlencoded data
// in other words, form data:
// 'Content-Type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Built in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use('/subdir', express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
// app.use('/subdir', require('./routes/subdir'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


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

app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
