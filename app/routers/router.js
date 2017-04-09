"use strict";
const express = require("express");
const apiRouter_1 = require("./apiRouter");
exports.router = express.Router();
apiRouter_1.apiRouter(exports.router);
