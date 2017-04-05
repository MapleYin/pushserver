"use strict";
const express = require("express");
// import session = require("express-session");
let app = express();
app.use(express.static(__dirname + '/public'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'maple',
    cookie: {
        maxAge: 15 * 24 * 3600000
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.listen(3000);
