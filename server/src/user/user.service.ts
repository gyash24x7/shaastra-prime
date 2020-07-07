import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {
	constructor() {}

	async hashPassword(password: string, salt: string) {
		return bcrypt.hash(password, salt);
	}

	async validatePassword(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}

	generateOTP() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
}
