"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiRouter_1 = require("./apiRouter");
exports.router = express.Router();
apiRouter_1.apiRouter(exports.router);
