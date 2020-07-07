import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common";
import bcrypt from "bcryptjs";
import { MailjetService } from "../mailjet/mailjet.service";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePasswordInput, VerifyPasswordOTPInput } from "./user.inputs";

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailjetService
	) {}

	async hashPassword(password: string, salt: string) {
		return bcrypt.hash(password, salt);
	}

	async validatePassword(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}

	generateOTP() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	async verifyUser(id: string) {
		await this.prismaService.user.update({
			where: { id },
			data: { verified: true }
		});
	}

	async verifyPasswordOTP({ email, passwordOTP }: VerifyPasswordOTPInput) {
		const user = await this.prismaService.user.findOne({ where: { email } });
		if (!user) throw new NotFoundException("User Not Found!");
		return user.passwordOTP === passwordOTP;
	}

	async sendPasswordOTP(email: string) {
		const user = await this.prismaService.user.findOne({ where: { email } });
		if (!user) throw new NotFoundException("User Not Found!");

		const passwordOTP = this.generateOTP();
		await this.prismaService.user.update({
			where: { email },
			data: { passwordOTP }
		});

		await this.mailService.sendMail({
			rollNumber: user.rollNumber,
			name: user.name,
			htmlPart: `<p>Your password reset code for Shaastra Prime is <strong>${passwordOTP}</strong> </p>`,
			subject: "Reset Your Password | Shaastra Prime"
		});
	}

	async updatePassword({ email, password, passwordOTP }: UpdatePasswordInput) {
		const user = await this.prismaService.user.findOne({ where: { email } });
		if (!user) throw new NotFoundException("User Not Found!");

		if (user.passwordOTP !== passwordOTP)
			throw new UnauthorizedException("Incorrect OTP!");

		await this.prismaService.user.update({
			where: { email },
			data: { password: await bcrypt.hash(password, user.salt) }
		});
	}
}
