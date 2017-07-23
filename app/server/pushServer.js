"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apn = require("apn");
const fs = require("fs");
const path = require("path");
class PushServer {
    constructor() {
        let cert = fs.readFileSync(path.join(__dirname, '../cert/SMSPush.pem'));
        let key = fs.readFileSync(path.join(__dirname, '../cert/key.pem'));
        this.apnProvider = new Apn.Provider({
            cert: cert,
            passphrase: "maple1105",
            key: key
        });
    }
    sendPush(payload) {
        this.currentPushPayload = new Apn.Notification();
        this.currentPushPayload.alert = payload;
        return this;
    }
    toUsers(userToken) {
        this.apnProvider.send(this.currentPushPayload, userToken);
    }
}
exports.pushServer = new PushServer();
