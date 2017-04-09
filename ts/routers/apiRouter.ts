import * as express from "express";
import {ValidateExpress} from '../util/token'
import {userServer} from '../server/userServer'


export let apiRouter = function(router:express.Router){
	router.get('/api/',function(req,res){
		res.json({message:'Welcome to Push Api!'});
	});

	// authorize
	router.post('/api/authorize',async function(req,res){
		let username = req.body.username;
		let password = req.body.password;

		let result = await userServer.validateUser(username,password);
		res.json(result);
	});

	// register
	router.post('/api/register',async function(req,res){
		let username = req.body.username;
		let password = req.body.password;
		try{
			let result = await userServer.userRegist(username,password);
			res.json(result);
		}catch(e){
			res.json(e);
		}
	});

    // need authorized
	router.all('/api/*',ValidateExpress,function(req,res,next){
		next();
	});

	router.post('/api/message',function(req,res){
	});

	router.all('*',function(req,res){
		res.sendStatus(404);
	});
};