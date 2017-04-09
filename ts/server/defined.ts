export enum StatusCode{
	success = 0,
	unauthorized = 100,
	accountError = 101, // 账号或密码错误
	accountExisted = 102,
	missParams = 200,
	universal = 500
}

let message = {};
message[StatusCode.success] = "ok";
message[StatusCode.unauthorized] = "Unauthorized";
message[StatusCode.accountError] = "Username or Password Error";
message[StatusCode.accountExisted] = "UserName was existed";
message[StatusCode.missParams] = "Miss Params";
message[StatusCode.universal] = "Undefined Error";

export let StatusMessage = message;


export interface IBaseResponse<T>{
	code : StatusCode;
	message : string;
	data : T;
}

export interface IListResponse<T>{
	code : StatusCode;
	message : string;
	data : [T];
}