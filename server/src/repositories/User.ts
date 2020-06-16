import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { SendMailOptions } from "../utils";
import mailjet from "../utils/mailjet";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	primaryFields = [
		"id",
		"name",
		"email",
		"rollNumber",
		"profilePic",
		"coverPic",
		"upi",
		"mobile",
		"about",
		"verified",
		"role"
	];

	relationalFields = ["department"];

	findByEmail(email: string, select: any[] = ["id"]) {
		return this.findOne({ where: { email }, select });
	}

	sendMail({ rollNumber, name, htmlPart, subject }: SendMailOptions) {
		if (process.env.NODE_ENV === "production") {
			return mailjet.post("send", { version: "v3" }).request({
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
		} else return Promise.resolve();
	}

	generateOTP() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
}
