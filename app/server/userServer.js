"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseServer_1 = require("./baseServer");
const CryptoJS = require("crypto-js");
const token_1 = require("../util/token");
class UserServer extends baseServer_1.BaseServer {
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.findBy('id', userId);
            return result;
        });
    }
    findByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.findBy('username', username);
            return result;
        });
    }
    validateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            password = CryptoJS.SHA256(password).toString();
            try {
                let result = yield this.findBy(['username', 'password'], [username, password]);
                if (result && result.length > 0) {
                    let info = result[0];
                    let token = token_1.createToken(info.username, info.secret);
                    return baseServer_1.CreateBaseResponse(token);
                }
                else {
                    return baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
                }
            }
            catch (e) {
                console.log("validateUser Error:");
                console.log(e);
                return baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
                ;
            }
        });
    }
    userRegist(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                success :
                {
                    "fieldCount": 0,
                    "affectedRows": 1,
                    "insertId": 8,
                    "serverStatus": 2,
                    "warningCount": 0,
                    "message": "",
                    "protocol41": true,
                    "changedRows": 0
                }
                error :
                {
                    "code": "ER_DUP_ENTRY",
                    "errno": 1062,
                    "sqlState": "23000",
                    "index": 0
                }
             */
            if (!username || !password) {
                throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.missParams);
            }
            let userResult = yield this.findByUserName(username);
            if (userResult && userResult.length > 0) {
                throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountExisted);
            }
            try {
                password = CryptoJS.SHA256(password).toString();
                let result = yield this.query('INSERT INTO user SET ?', {
                    username: username,
                    password: password,
                    secret: token_1.createRandomSecret(10)
                });
                console.log(result);
                if (result && result.insertId) {
                    return baseServer_1.CreateBaseResponse(null);
                }
                else {
                    throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.universal);
                }
            }
            catch (e) {
                console.log(e);
                throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.universal);
            }
        });
    }
    findBy(params, value, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var matchParams;
            console.log(params, value);
            if (Array.isArray(params) && Array.isArray(value)) {
                let paramsArray = params;
                matchParams = paramsArray.join(' = ? AND ') + ' = ?';
            }
            else if (!Array.isArray(params) && !Array.isArray(value)) {
                value = [value];
                matchParams = params + ' = ?';
            }
            if (!matchParams) {
                throw "Error Params or Value";
            }
            let result = yield this.query(`SELECT * FROM user WHERE ${matchParams}`, value);
            return result;
        });
    }
}
exports.userServer = new UserServer();
