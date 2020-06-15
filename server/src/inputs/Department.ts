import { Field, InputType } from "type-graphql";
import { UserRole } from "../utils";

@InputType("AssignFinManagerInput")
export class AssignFinManagerInput {
	@Field() userId: string;
	@Field() deptId: string;
}

@InputType("GrantAccessInput")
export class GrantAccessInput {
	@Field() userId: string;
	@Field(() => UserRole) role: UserRole;
}
