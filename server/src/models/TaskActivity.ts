import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { TaskActivityType } from "./../utils/index";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(TaskActivityType, { name: "TaskActivityType" });

@Entity("TaskActivity")
@ObjectType("TaskActivity")
export class TaskActivity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: TaskActivityType })
	@Field(() => TaskActivityType)
	type: TaskActivityType;

	@ManyToOne(() => Task, (task) => task.activity, { lazy: true })
	@Field(() => Task)
	task: Promise<Task>;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@ManyToOne(() => User, (user) => user.taskActivity, { lazy: true })
	createdBy: Promise<User>;

	@OneToMany(() => Message, (message) => message.taskActivity, { lazy: true })
	messages: Promise<Message[]>;
}
