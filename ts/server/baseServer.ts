import {DBPool} from "../db/db";
import {IBaseResponse,StatusCode,StatusMessage} from "./defined"
export * from "./defined"

export function CreateBaseResponse<T>(data:T):IBaseResponse<T>{
	return {
		code : StatusCode.success,
		message : StatusMessage[StatusCode.success],
		data : data
	}
};

export function CreateErrorResponse(errorCode:StatusCode,message?:string):IBaseResponse<string>{
	return {
		code : errorCode,
		message : message || StatusMessage[errorCode],
		data : null
	}
}

export class BaseServer{
	protected update(){
	}
	protected insert(){
	}
	/**
	 * SELECT [table] 
	 */
	protected select(){
	}




	protected query(queryString:string,params?:any):Promise<any>{
		console.log(queryString,params);
		return new Promise(function(resolve,reject){
			DBPool.query(queryString,params,function(error,result,fields){
				if(!error) {
					resolve(result);
				}else{
					reject(error);
				}
			});
		})
	}
}