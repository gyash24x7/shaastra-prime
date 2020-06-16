import bcrypt from "bcryptjs";
import { Inject } from "typedi";
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent
} from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	@Inject()
	private readonly userRepo: UserRepository;

	listenTo() {
		return User;
	}

	async beforeInsert(e: InsertEvent<User>) {
		e.entity.password = await bcrypt.hash(e.entity.password, 13);
		e.entity.verificationOTP = this.userRepo.generateOTP();
	}

	async afterInsert({ entity }: InsertEvent<User>) {
		await this.userRepo.sendMail({
			rollNumber: entity.rollNumber,
			name: entity.name,
			subject: "Complete Smail Verification | Shaastra Prime",
			htmlPart: `<p>You verification code is <strong>${entity.verificationOTP}</strong></p>`
		});
	}
}
