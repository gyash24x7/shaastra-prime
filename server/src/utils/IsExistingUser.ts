import { PrismaClient } from "@prisma/client";
import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
	async validate(email: string) {
		const prisma = new PrismaClient();
		let user = await prisma.user.findOne({ where: { email } });
		return !user;
	}
}

export const IsExistingUser = (options?: ValidationOptions) => (
	object: Object,
	propertyName: string
) =>
	registerDecorator({
		target: object.constructor,
		propertyName,
		options,
		constraints: [],
		validator: IsExistingUserConstraint
	});
