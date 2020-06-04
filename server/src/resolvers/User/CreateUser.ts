import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUser";
import { GraphQLContext } from "../../utils";
dotenv.config();

@Resolver()
export class CreateUserResolver {
	@Mutation(() => [String])
	async createUser(
		@Arg("data") { departmentId, ...data }: CreateUserInput,
		@Ctx() { prisma, mailjet }: GraphQLContext
	) {
		const password = await bcrypt.hash(data.password, 13);
		const verificationOTP = Math.floor(
			100000 + Math.random() * 900000
		).toString();

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

		if (!!user && process.env.NODE_ENV === "production") {
			await mailjet
				.post("send", { version: "v3" })
				.request({
					FromEmail: "prime@shaastra.org",
					FromName: "Shaastra Prime Bot",
					Recipients: [
						{
							Email: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
							Name: user.name
						}
					],
					Subject: "Complete Smail Verification | Shaastra Prime",
					"Html-part": `<p>You verification code is <strong>${verificationOTP}</strong></p>`
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
		token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

		return [token, ""];
	}
}
