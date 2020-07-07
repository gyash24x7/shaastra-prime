import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import mailjet, { Email } from "node-mailjet";

export interface SendMailOptions {
	rollNumber: string;
	name: string;
	subject: string;
	htmlPart: string;
}

@Injectable()
export class MailjetService {
	private mailClient: Email.Client;
	constructor(configService: ConfigService) {
		this.mailClient = mailjet.connect(
			configService.get("MAILJET_APIKEY") || "",
			configService.get("MAILJET_APISECRET") || ""
		);
	}

	sendMail({ rollNumber, name, htmlPart, subject }: SendMailOptions) {
		return this.mailClient.post("send", { version: "v3" }).request({
			FromEmail: "prime@shaastra.org",
			FromName: "Shaastra Prime Bot",
			Recipients: [
				{
					Email: `${rollNumber.toLowerCase()}@smail.iitm.ac.in`,
					Name: name
				}
			],
			Subject: subject,
			"Html-part": htmlPart
		});
	}
}
