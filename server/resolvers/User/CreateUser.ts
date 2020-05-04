import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUser";
import { User } from "../../models/User";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateUserResolver {
	@Mutation(() => User)
	async createUser(
		@Arg("data") { departmentId, ...data }: CreateUserInput,
		@Ctx() { req }: GraphQLContext
	) {
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

		// const mailOptions = {
		// 	from: "webops@shaastra.org",
		// 	to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
		// 	subject: "Verify Your Email | Shaastra Prime",
		// 	html: `<p>Your verification code for Shaastra Prime is <strong>${verificationOTP}</strong> </p>`
		// };

		if (!!user) {
			// await sendgrid.send(mailOptions);
			req.session!.userId = user.id;
		}
		return user;
	}
}
