import { Field, ID, ObjectType } from "type-graphql";

import { Department } from "./Department";
import { User } from "./User";

@ObjectType()
export class Update {
	@Field(() => ID) id: number;
	@Field() subject: string;
	@Field() content: string;
	@Field(() => Department) byDept: Department;
	@Field(() => User) postedBy: User;
	@Field() createdAt: string;
}
