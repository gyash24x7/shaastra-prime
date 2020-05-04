import { Arg, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class SendPasswordOTPResolver {
	@Mutation(() => Boolean)
	async sendPasswordOTP(@Arg("email") email: string) {
		const user = await prisma.user.findOne({ where: { email } });
		if (!user) return false;

		const passwordOTP = Math.round(Math.random() * 1000000).toString();
		await prisma.user.update({ where: { email }, data: { passwordOTP } });

		// const mailOptions = {
		// 	from: "webops@shaastra.org",
		// 	to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
		// 	subject: "Reset Your Password | Shaastra Prime",
		// 	html: `<p>Your password reset code for Shaastra Prime is <strong>${otp}</strong> </p>`
		// };

		// await sendgrid.send(mailOptions);

		return true;
	}
}
