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
const JWT = require("../util/token");
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
                let result = yield this.query('SELECT id FROM user WHERE username = ? AND password = ? LIMIT 1', [username, password]);
                if (result && result.length > 0) {
                    let info = result[0];
                    let token = JWT.createToken(info.id.toString());
                    return baseServer_1.CreateBaseResponse(token);
                }
                else {
                    return baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
                }
            }
            catch (e) {
                console.log(e);
                return e;
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
            let result = yield this.query('INSERT INTO user SET ?', {
                username: username,
                password: password,
                secret: JWT.createRandomSecret(10)
            });
            return result;
        });
    }
    findBy(params, value, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var matchParams;
            if (Array.isArray(params) && Array.isArray(value)) {
                let paramsArray = params;
                matchParams = paramsArray.join(' = ? AND ') + ' = ?';
            }
            else if (typeof params == 'string' && typeof value == 'string') {
                value = [value];
            }
            let result = yield this.query(`SELECT * FROM user WHERE ${matchParams}`, value);
            return result;
        });
    }
}
exports.userServer = new UserServer();
