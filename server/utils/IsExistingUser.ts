import {
	ValidatorConstraintInterface,
	ValidationOptions,
	registerDecorator,
	ValidatorConstraint
} from "class-validator";
import { User } from "../models/User";

@ValidatorConstraint({ async: true })
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
	async validate(rollNumber: string) {
		return User.findOne({ where: { rollNumber } }).then(user => !user);
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
