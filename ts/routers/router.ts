import * as express from "express";
import {apiRouter} from './apiRouter'
export let router = express.Router();


apiRouter(router);

