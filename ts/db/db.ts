import {dbSetting} from './setting'
import MySQL = require("mysql");

export let DBPool = MySQL.createPool(dbSetting);
