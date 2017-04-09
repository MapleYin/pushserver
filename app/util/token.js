"use strict";
const JsonWebTokenValidate = require("express-jwt");
const JsonWebToken = require("jsonwebtoken");
const NodeCache = require("node-cache");
const userServer_1 = require("../server/userServer");
let nodeCache = new NodeCache({
    stdTTL: 15 * 24 * 3600
});
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
    secret: (req, payload, done) => {
        var secret;
        if (payload && payload.username) {
            secret = nodeCache.get(payload.username);
            console.log("get secret from cache");
        }
        if (secret) {
            done(null, secret);
        }
        else {
            let result = userServer_1.userServer.findByUserName(payload.username);
            result.then((result) => {
                if (result && result.length > 0) {
                    let userInfo = result[0];
                    secret = userInfo.secret;
                    console.log("get secret from db:" + secret);
                    done(null, secret);
                }
                else {
                    done("No Secret Found!", null);
                }
            }).catch((reason) => {
                done("No Secret Found!", null);
            });
        }
    },
    isRevoked: (req, payload, done) => {
        console.log("isRevoked:" + payload);
        done(null, false);
    }
};
exports.ValidateExpress = JsonWebTokenValidate(options);
function createToken(username, secret) {
    console.log('createToken:', username, secret);
    nodeCache.set(username, secret);
    return JsonWebToken.sign({ username: username }, secret, {
        expiresIn: EXPIRES
    });
}
exports.createToken = createToken;
;
// 33 ~ 126
function createRandomSecret(length) {
    let charArray = [];
    while (length > 0) {
        charArray.push(String.fromCharCode(Math.random() * 93 + 33));
        length--;
    }
    return charArray.join('');
}
exports.createRandomSecret = createRandomSecret;
;
