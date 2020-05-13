import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUser";
import { prisma } from "../../prisma";
import mailjet from "../../utils/mailjet";
dotenv.config();

@Resolver()
export class CreateUserResolver {
	@Mutation(() => String)
	async createUser(@Arg("data") { departmentId, ...data }: CreateUserInput) {
		const password = await bcrypt.hash(data.password, 13);
		const verificationOTP = Math.round(Math.random() * 1000000).toString();
		const user = await prisma.user.create({
			data: {
				...data,
				password,
				verificationOTP,
				profilePic: "",
				coverPic: "",
				about: "",
				upi: "",
				department: {
					connect: { id: departmentId }
				}
			}
		});

		let token = "";

		if (!!user) {
			await mailjet.post("send", { version: "v3.1" }).request({
				Messages: [
					{
						From: {
							Email: "prime@shaastra.org",
							Name: "Shaastra Prime Bot"
						},
						To: {
							Email: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
							Name: user.name
						},
						Subject: "Complete Smail Verification | Shaastra Prime",
						HTMLPart: `<p>You verification code is <strong>${verificationOTP}</strong></p>`
					}
				]
			});
			token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		}

		return token;
	}
}
