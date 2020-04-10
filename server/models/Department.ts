import { Field, ID, ObjectType } from "type-graphql";

import { Task } from "./Task";
import { Update } from "./Update";
import { User } from "./User";

@ObjectType()
export class Department {
	@Field(() => ID) id: number;
	@Field() name: string;
	@Field(() => [String]) subDepartments: string[];
	@Field(() => [User]) members: User[];
	@Field(() => [Task]) tasksAssigned: Task[];
	@Field(() => [Task]) tasksCreated: Task[];
	@Field(() => [Update]) updates: Update[];
}
