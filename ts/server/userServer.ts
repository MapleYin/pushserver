import {BaseServer,CreateBaseResponse,CreateErrorResponse,StatusCode} from "./baseServer"
import CryptoJS = require('crypto-js');
import * as JWT from "../util/token"

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
			let result = await this.query('SELECT id FROM user WHERE username = ? AND password = ? LIMIT 1',[username,password]);
			if(result && result.length > 0) {
				let info = result[0];
				let token = JWT.createToken(info.id.toString());
				return CreateBaseResponse<string>(token);
			}else{
				return CreateErrorResponse(StatusCode.accountError);
			}
		}catch(e){
			console.log(e);
			return e;
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
		
		let result = await this.query('INSERT INTO user SET ?',{
			username:username,
			password:password,
			secret : JWT.createRandomSecret(10)
		});
		return result;
	}

	private async findBy(params:string|[string],value:(string|number)|[string|number],limit?:number){
		var matchParams:string;
		if(Array.isArray(params) && Array.isArray(value)) {
			let paramsArray = params as Array<string>;
			matchParams = paramsArray.join(' = ? AND ')+' = ?';
		}else if(typeof params == 'string' && typeof value == 'string'){
			value = [value];
		}
		let result = await this.query(`SELECT * FROM user WHERE ${matchParams}`,value);
		return result;
	}

}
export let userServer = new UserServer();