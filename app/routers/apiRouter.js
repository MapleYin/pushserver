"use strict";
const token_1 = require("../util/token");
const userServer_1 = require("../server/userServer");
exports.apiRouter = function (router) {
    router.get('/api/', function (req, res) {
        res.json({ message: 'Welcome to Push Api!' });
    });
    // authorize
    router.post('/api/authorize', async function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let result = await userServer_1.userServer.validateUser(username, password);
        res.json(result);
    });
    // register
    router.post('/api/register', async function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        try {
            let result = await userServer_1.userServer.userRegist(username, password);
            res.json(result);
        }
        catch (e) {
            res.json(e);
        }
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
