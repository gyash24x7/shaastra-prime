import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetPasswordOTPResolver {
	@Mutation(() => Boolean)
	async getPasswordOTP(
		@Arg("email") email: string,
		@Ctx() { mailjet }: GraphQLContext
	) {
		let user = await User.findOne({ where: { email } });
		if (!user) return false;

		const passwordOTP = Math.floor(100000 + Math.random() * 900000).toString();
		user.passwordOTP = passwordOTP;
		user = await user.save();

		await mailjet.post("send", { version: "v3" }).request({
			FromEmail: "prime@shaastra.org",
			FromName: "Shaastra Prime Bot",
			Recipients: [
				{
					Email: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
					Name: user.name
				}
			],
			Subject: "Reset Your Password | Shaastra Prime",
			"Html-part": `<p>Your password reset code for Shaastra Prime is <strong>${passwordOTP}</strong> </p>`,
			"Text-part": `Your password reset code for Shaastra Prime is ${passwordOTP}`
		});

		return true;
	}
}
