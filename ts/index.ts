import * as express from "express";
import * as bodyParser from "body-parser";
import connect = require("connect");

// import session = require("express-session");
// import MySQLStoreFactory = require("express-mysql-session");
// import connectMongo = require('connect-mongo')
import {router} from './routers/router';
import subdomains = require("express-subdomains");

// const MongoStore = connectMongo(session);

// let MySQLStore = MySQLStoreFactory(session);

// var options = {
//     host: 'localhost',
//     user     : 'root',
// 	password : 'maple1105',
// 	database : 'push'
// };

// var sessionStore = new MySQLStore(options);

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
// 	resave:false,
//   	saveUninitialized: true,
// 	secret: 'maple',
// 	store : sessionStore,
// 	cookie:{
// 		maxAge: 15*24*3600000
// 	}
// }));

// subdomains.use('api');
// app.use(subdomains.middleware);
app.use(router);


app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send(err.message);
	}else{
		res.send(err);
	}
});

app.listen(3002);