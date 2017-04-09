import {BaseServer,CreateBaseResponse,CreateErrorResponse,StatusCode} from "./baseServer"
import CryptoJS = require('crypto-js');
import {createToken,createRandomSecret} from '../util/token'

class UserServer extends BaseServer{

	async findById(userId:number){
		let result = await this.findBy('id',userId);
		return result;
	}

	async findByUserName(username:string){
		let result = await this.findBy('username',username);
		return result;
	}

	async validateUser(username:string,password:string){
		password = CryptoJS.SHA256(password).toString();
		try{
			let result = await this.findBy(['username','password'],[username,password]);
			if(result && result.length > 0) {
				let info = result[0];
				let token = createToken(info.username,info.secret);
				return CreateBaseResponse<string>(token);
			}else{
				return CreateErrorResponse(StatusCode.accountError);
			}
		}catch(e){
			console.log("validateUser Error:");
			console.log(e);
			return CreateErrorResponse(StatusCode.accountError);;
		}
		
	}

	async userRegist(username:string,password:string){
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
		if(!username || !password) {
			throw CreateErrorResponse(StatusCode.missParams);
		}
		let userResult = await this.findByUserName(username);

		if(userResult && userResult.length > 0) {
			throw CreateErrorResponse(StatusCode.accountExisted);
		}

		try{
			password = CryptoJS.SHA256(password).toString();
			let result = await this.query('INSERT INTO user SET ?',{
				username:username,
				password:password,
				secret : createRandomSecret(10)
			});
			console.log(result);
			if(result && result.insertId) {
				return CreateBaseResponse<any>(null);
			}else{
				throw CreateErrorResponse(StatusCode.universal);
				
			}
		}catch(e){
			console.log(e);
			throw CreateErrorResponse(StatusCode.universal);
		}
	}

	private async findBy(params:string|[string],value:(string|number)|[string|number],limit?:number){
		var matchParams:string;
		console.log(params,value);
		if(Array.isArray(params) && Array.isArray(value)) {
			let paramsArray = params as Array<string>;
			matchParams = paramsArray.join(' = ? AND ')+' = ?';
		}else if(!Array.isArray(params) && !Array.isArray(value)){
			value = [value];
			matchParams = params +' = ?';
		}
		if(!matchParams) {
			throw "Error Params or Value";
			
		}
		let result = await this.query(`SELECT * FROM user WHERE ${matchParams}`,value);
		return result;
	}

}
export let userServer = new UserServer();