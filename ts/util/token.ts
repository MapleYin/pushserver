import JsonWebTokenValidate = require("express-jwt");
import JsonWebToken = require("jsonwebtoken");
import * as express from "express";
import NodeCache = require( "node-cache" );

let nodeCache = new NodeCache({
	stdTTL : 15 * 24 * 3600
});

namespace JWT{
	let SECRET = 'v1.push.maple.im';
	let EXPIRES = '15d';

	// secret: secretType | SecretCallback;
// userProperty?: string;
// skip?: string[];
// credentialsRequired?: boolean;
// isRevoked?: IsRevokedCallback;
// requestProperty?: string;
// getToken?: GetTokenCallback;
// [property: string]: any;

// var secretCallback = function(req, payload, done){
//   var issuer = payload.iss;

//   data.getTenantByIdentifier(issuer, function(err, tenant){
//     if (err) { return done(err); }
//     if (!tenant) { return done(new Error('missing_secret')); }

//     var secret = utilities.decrypt(tenant.secret);
//     done(null, secret);
//   });
// };

// 	var isRevokedCallback = function(req, payload, done){
//   var issuer = payload.iss;
//   var tokenId = payload.jti;

//   data.getRevokedToken(issuer, tokenId, function(err, token){
//     if (err) { return done(err); }
//     return done(null, !!token);
//   });
// };
	let options = {
		secret : (req, payload, done)=>{
			console.log("secret:");
			console.log(payload);
			done(null,SECRET);
		},
		isRevoked:(req, payload, done)=>{
			console.log("isRevoked:");
			console.log(payload);
			return false;
		}
	};

	export let ValidateExpress = JsonWebTokenValidate(options);

	export function createToken(id:string){
		return JsonWebToken.sign({userId:id},SECRET,{
			expiresIn : EXPIRES,
			jwtid : id
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
}

export = JWT;


