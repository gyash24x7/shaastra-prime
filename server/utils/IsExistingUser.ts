import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { prisma } from "../prisma";

@ValidatorConstraint({ async: true })
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
	async validate(rollNumber: string) {
		let user = await prisma.user.findOne({ where: { rollNumber } });
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
