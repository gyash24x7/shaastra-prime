import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";
import { TaskStatus } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(TaskStatus, { name: "TaskStatus" });

@Entity("Task")
@ObjectType("Task")
export class Task {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	brief: string;

	@Column()
	@Field()
	details: string;

	@Field(() => Department) byDept: Department;
	@Field(() => Department) forDept: Department;
	@Field(() => User) createdBy: User;
	@Field(() => [User]) assignedTo: User[];

	@Column("enum", { enum: TaskStatus, default: TaskStatus.NOT_ASSIGNED })
	@Field(() => TaskStatus)
	status: TaskStatus;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column("timestamp")
	@Field()
	deadline: string;

	@Field(() => [Media]) media: Media[];
	@Field(() => [TaskActivity]) activity: TaskActivity[];
	@Field(() => [Channel]) channels: Channel[];
}
