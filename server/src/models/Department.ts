import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Goal } from "./Goal";
import { Invoice } from "./Invoice";
import { Task } from "./Task";
import { Update } from "./Update";
import { User } from "./User";

@Entity("Department")
@ObjectType("Department")
export class Department {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@PrimaryColumn()
	@Field()
	name: string;

	@Column()
	@Field()
	shortName: string;

	@Field(() => [User]) members: User[];
	@Field(() => [Task]) tasksAssigned: Task[];
	@Field(() => [Task]) tasksCreated: Task[];
	@Field(() => [Update]) updates: Update[];
	@Field(() => [Invoice]) invoicesSubmitted: Invoice[];
	@Field(() => [String]) subDepartments: string[];
	@Field(() => [Goal]) goals: Goal[];
}
