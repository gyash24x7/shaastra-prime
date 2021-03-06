import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { MailjetService } from "../mailjet/mailjet.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserInput, LoginInput } from "../user/user.inputs";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly mailService: MailjetService
	) {}

	async signUpAsPrimeUser(data: CreateUserInput) {
		const salt = await bcrypt.genSalt();
		const hash = await this.userService.hashPassword(data.password, salt);
		const verificationOTP = this.userService.generateOTP();
		let { rollNumber, name, id } = await this.prismaService.user.create({
			data: { ...data, password: hash, salt, verificationOTP }
		});
		const accessToken = this.jwtService.sign({ id });
		await this.mailService.sendMail({
			rollNumber,
			name,
			subject: "Complete Smail Verification | Shaastra Prime",
			htmlPart: `<p>You verification code is <strong>${verificationOTP}</strong></p>`
		});
		return [accessToken, ""];
	}

	async loginAsPrimeUser({ email, password }: LoginInput) {
		const user = await this.prismaService.user.findOne({ where: { email } });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const valid = await this.userService.validatePassword(
			password,
			user.password
		);

		if (!valid) throw new UnauthorizedException("Invalid Credentials!");

		const accessToken = this.jwtService.sign({ id: user.id });
		if (user.verified) return [accessToken, user.id];
		else return [accessToken, ""];
	}
}
