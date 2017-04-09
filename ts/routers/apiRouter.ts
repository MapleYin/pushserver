import * as express from "express";
import * as JWT from '../util/token'
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
	router.post('/api/validate',function(req,res){
	});

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

    // auth
	router.all('/api/*',JWT.ValidateExpress,function(req,res,next){
		next();
	});

	router.post('/api/message',function(req,res){
		res.json({
			message:'message'
		});
	});

	router.all('*',function(req,res){
		res.sendStatus(404);
	});
};