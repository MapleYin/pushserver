import Apn = require("apn");
import fs = require("fs");
import path = require("path");

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

	sendAlert(){
		

		
		return this;
	}



	private sendPush(){
		this.currentPushPayload = new Apn.Notification();

		return this;
	}

	toUsers(){

	}
	// test(){
	// 	var note = new Apn.Notification();
	// 	note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	// 	note.payload = {'messageFrom': 'John Appleseed'};
	// 	let token = "37132DD94C62143181165CA24C42C3E365845ABAD99574B72CB0E214AEEF943E";
	// 	this.apnProvider.send(note,token);
	// }



}

export let pushServer = new PushServer();