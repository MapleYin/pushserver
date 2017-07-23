"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonWebTokenValidate = require("express-jwt");
const JsonWebToken = require("jsonwebtoken");
const NodeCache = require("node-cache");
const userServer_1 = require("../server/userServer");
let nodeCache = new NodeCache({
    stdTTL: 15 * 24 * 3600
});
let SECRET = 'v1.push.maple.im';
let EXPIRES = '15d';
let options = {
    secret: (req, payload, done) => {
        var secret;
        if (payload && payload.username) {
            secret = nodeCache.get(payload.username);
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
        done(null, false);
    }
};
exports.ValidateExpress = JsonWebTokenValidate(options);
function createToken(username, secret) {
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
