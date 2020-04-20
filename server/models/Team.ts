import { Field, ID, ObjectType } from "type-graphql";

import { Department } from "./Department";
import { User } from "./User";

@ObjectType()
export class Team {
	@Field(() => ID) id: number;
	@Field() name: string;
	@Field(() => [User]) members: User[];
	@Field(() => Department) department: Department;
}
