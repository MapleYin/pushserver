"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["success"] = 0] = "success";
    // error
    StatusCode[StatusCode["unauthorized"] = 100] = "unauthorized";
    StatusCode[StatusCode["accountError"] = 101] = "accountError";
    StatusCode[StatusCode["accountExisted"] = 102] = "accountExisted";
    StatusCode[StatusCode["missParams"] = 200] = "missParams";
    StatusCode[StatusCode["universal"] = 500] = "universal";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
let message = {};
message[StatusCode.success] = "ok";
message[StatusCode.unauthorized] = "Unauthorized";
message[StatusCode.accountError] = "Username or Password Error";
message[StatusCode.accountExisted] = "UserName was existed";
message[StatusCode.missParams] = "Miss Params";
message[StatusCode.universal] = "Undefined Error";
exports.StatusMessage = message;
