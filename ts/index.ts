import * as express from "express";
import {db} from "./db/db"
import session = require("express-session");
import connectMongo = require('connect-mongo')
import {router} from './routers/router';
const MongoStore = connectMongo(express);

let app = express();

app.use(session({
	secret: 'maple',
	store : new MongoStore({mongooseConnection : db.connection}),
	cookie:{
		maxAge: 15*24*3600000
	}
}));
app.use(router);
app.listen(3002);