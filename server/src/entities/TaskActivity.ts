import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { TaskActivityType } from "../utils/index";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(TaskActivityType, { name: "TaskActivityType" });

@Entity("TaskActivity")
@ObjectType("TaskActivity")
export class TaskActivity {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: TaskActivityType })
	@Field(() => TaskActivityType)
	type: TaskActivityType;

	@Column()
	@Field()
	description: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Task, (task) => task.activity, { onDelete: "CASCADE" })
	@Field(() => Task)
	task: Task;

	@Column()
	taskId: string;

	@ManyToOne(() => User, (user) => user.taskActivity)
	createdBy: User;

	@Column()
	createdById: string;
}
