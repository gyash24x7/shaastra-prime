import { InputType, Field, Int } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { IsExistingUser } from "../../utils/IsExistingUser";
@InputType()
export class CreateUserInput {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;

	@Field()
	@Length(8, 8)
	@IsExistingUser({ message: "User Already Exists!" })
	rollNumber: string;

	@Field()
	@Length(10, 10)
	mobile: string;

	@Field()
	upi: string;

	@Field(() => Int)
	departmentId: number;
}
