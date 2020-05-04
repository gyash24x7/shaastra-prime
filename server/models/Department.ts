import { Field, ID, ObjectType } from "type-graphql";
import { Goal } from "./Goal";
import { Invoice } from "./Invoice";
import { Task } from "./Task";
import { Team } from "./Team";
import { Update } from "./Update";
import { User } from "./User";

@ObjectType()
export class Department {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() shortName: string;
	@Field(() => [User]) members: User[];
	@Field(() => [Task]) tasksAssigned: Task[];
	@Field(() => [Task]) tasksCreated: Task[];
	@Field(() => [Update]) updates: Update[];
	@Field(() => [Invoice]) invoicesSubmitted: Invoice[];
	@Field(() => [Team]) subDepartments: Team[];
	@Field(() => [Goal]) goals: Goal[];
}
