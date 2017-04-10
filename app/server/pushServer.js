"use strict";
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
    sendAlert() {
        return this;
    }
    sendPush() {
        this.currentPushPayload = new Apn.Notification();
        return this;
    }
    toUsers() {
    }
}
exports.pushServer = new PushServer();
