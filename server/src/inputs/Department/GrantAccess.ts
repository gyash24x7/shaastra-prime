import { Field, InputType } from "type-graphql";
import { UserRole } from "../../utils";

@InputType("GrantAccessInput")
export class GrantAccessInput {
	@Field() userId: string;
	@Field(() => UserRole) role: UserRole;
}
