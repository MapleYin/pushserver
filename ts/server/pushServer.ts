import Apn = require("apn");
import fs = require("fs");
import path = require("path");


export interface PushPayload{
	title?: string;
	subtitle?: string;
	body: string;
	"title-loc-key"?: string;
	"title-loc-args"?: string[];
	"action-loc-key"?: string;
	"loc-key"?: string;
	"loc-args"?: string[];
	"launch-image"?: string;
}

class PushServer{
	private apnProvider:Apn.Provider;

	private currentPushPayload:Apn.Notification;

	constructor(){
		let cert = fs.readFileSync(path.join(__dirname,'../cert/SMSPush.pem'));
		let key = fs.readFileSync(path.join(__dirname,'../cert/key.pem'));
		this.apnProvider = new Apn.Provider({
			cert : cert,
			passphrase : "maple1105",
			key : key
		});
	}

	sendPush(payload:PushPayload){
		this.currentPushPayload = new Apn.Notification();
		this.currentPushPayload.alert = payload;
		return this;
	}

	toUsers(userToken:string[]){
		this.apnProvider.send(this.currentPushPayload,userToken)
	}

}

export let pushServer = new PushServer();