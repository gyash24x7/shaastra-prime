import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType("User")
export class UserType {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() email: string;
	@Field() rollNumber: string;
	@Field() mobile: string;
	@Field() upi: string;
	@Field() about: string;
	@Field(() => UserRole) role: UserRole;
	@Field() verified: boolean;
	@Field() department: string;
}
