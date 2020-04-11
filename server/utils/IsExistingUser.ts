import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
	async validate(rollNumber: string) {
		return User.findOne({ where: { rollNumber } }).then((user) => !user);
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
