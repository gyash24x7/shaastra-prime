import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsExistingUser } from "../../utils/IsExistingUser";

@InputType()
export class CreateUserInput {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	@IsExistingUser({ message: "User Already Exists!" })
	email: string;

	@Field()
	password: string;

	@Field()
	@Length(8, 8)
	rollNumber: string;

	@Field()
	@Length(10, 10)
	mobile: string;

	@Field()
	departmentId: string;
}
