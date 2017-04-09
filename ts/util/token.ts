import JsonWebTokenValidate = require("express-jwt");
import JsonWebToken = require("jsonwebtoken");
import * as express from "express";
import NodeCache = require( "node-cache" );
import CryptoJS = require('crypto-js');
import {userServer} from '../server/userServer';


let nodeCache = new NodeCache({
	stdTTL : 15 * 24 * 3600
});
let SECRET = 'v1.push.maple.im';
let EXPIRES = '15d';

let options = {
	secret : (req, payload, done)=>{
		var secret;
		if(payload && payload.username) {
			secret = nodeCache.get<string>(payload.username);
		}
		if(secret) {
			done(null,secret);
		}else{
			let result = userServer.findByUserName(payload.username);
			result.then((result)=>{
				if(result && result.length > 0) {
					let userInfo = result[0];
					secret = userInfo.secret
					done(null,secret);
				}else{
					done("No Secret Found!",null);
				}
			}).catch((reason)=>{
				done("No Secret Found!",null);
			});
		}	
	},
	isRevoked:(req, payload, done)=>{
		done(null,false);
	}
};

export let ValidateExpress = JsonWebTokenValidate(options);

export function createToken(username:string,secret:string){
	nodeCache.set(username,secret);
	return JsonWebToken.sign({username:username},secret,{
		expiresIn : EXPIRES
	});
};
// 33 ~ 126
export function createRandomSecret(length:number){
	let charArray = [];
	while(length > 0){
		charArray.push(String.fromCharCode(Math.random()*93+33));
		length--;
	}
	return charArray.join('');
};



