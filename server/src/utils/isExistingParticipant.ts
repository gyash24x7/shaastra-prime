import { PrismaClient } from "@prisma/client";
import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsExistingParticipantConstraint
	implements ValidatorConstraintInterface {
	async validate(email: string) {
		const prisma = new PrismaClient();
		let user = await prisma.participant.findOne({ where: { email } });
		return !user;
	}
}

export const IsExistingParticipant = (options?: ValidationOptions) => (
	object: Object,
	propertyName: string
) =>
	registerDecorator({
		target: object.constructor,
		propertyName,
		options,
		constraints: [],
		validator: IsExistingParticipantConstraint
	});
