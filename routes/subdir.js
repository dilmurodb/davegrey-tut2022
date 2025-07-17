const express = require('express');
const router = express.Router();
const path = require('path');

router.get(/^\/$|^\/index(?:\.html)?$/ , (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'))
});

router.get(/^\/testsubdir(?:.html)?$/ , (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'testsubdir.html'))
});


module.exports = router
