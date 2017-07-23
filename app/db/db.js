"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("./setting");
const MySQL = require("mysql");
exports.DBPool = MySQL.createPool(setting_1.dbSetting);
