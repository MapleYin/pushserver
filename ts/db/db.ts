import {dbSetting} from './setting'
import mongoose = require('mongoose');

mongoose.connect('mongodb://' + dbSetting.host + ':' + dbSetting.prot + '/' + dbSetting.db)

console.log("init mongoose");

export let db = mongoose;


