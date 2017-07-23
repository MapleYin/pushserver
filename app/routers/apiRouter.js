"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../util/token");
const userServer_1 = require("../server/userServer");
exports.apiRouter = function (router) {
    router.get('/api/', function (req, res) {
        res.json({ message: 'Welcome to Push Api!' });
    });
    // authorize
    router.post('/api/authorize', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let password = req.body.password;
            let result = yield userServer_1.userServer.validateUser(username, password);
            res.json(result);
        });
    });
    // register
    router.post('/api/register', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let password = req.body.password;
            try {
                let result = yield userServer_1.userServer.userRegist(username, password);
                res.json(result);
            }
            catch (e) {
                res.json(e);
            }
        });
    });
    // need authorized
    router.all('/api/*', token_1.ValidateExpress, function (req, res, next) {
        next();
    });
    router.post('/api/message', function (req, res) {
    });
    router.all('*', function (req, res) {
        res.sendStatus(404);
    });
};
