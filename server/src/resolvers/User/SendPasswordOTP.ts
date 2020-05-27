import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";
import mailjet from "../../utils/mailjet";

@Resolver()
export class SendPasswordOTPResolver {
	@Mutation(() => Boolean)
	async sendPasswordOTP(
		@Arg("email") email: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const user = await prisma.user.findOne({ where: { email } });
		if (!user) return false;

		const passwordOTP = Math.round(Math.random() * 1000000).toString();
		await prisma.user.update({ where: { email }, data: { passwordOTP } });

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
					subject: "Reset Your Password | Shaastra Prime",
					HTMLPart: `<p>Your password reset code for Shaastra Prime is <strong>${passwordOTP}</strong> </p>`
				}
			]
		});

		return true;
	}
}
