import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserRole } from "../utils";
import { Department } from "./Department";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType("User")
export class User {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() email: string;
	@Field() rollNumber: string;
	@Field() profilePic: string;
	@Field() coverPic: string;
	@Field() mobile: string;
	@Field() upi: string;
	@Field() about: string;
	@Field(() => UserRole) role: UserRole;
	@Field() verified: boolean;
	@Field(() => Department) department: Department;
}
