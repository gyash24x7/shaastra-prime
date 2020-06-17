import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	SaveOptions
} from "typeorm";
import { MessagePubsubOptions, TaskActivityType } from "../utils";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(TaskActivityType, { name: "TaskActivityType" });

@Entity("TaskActivity")
@ObjectType("TaskActivity")
export class TaskActivity extends BaseEntity {
	static primaryFields = ["id", "type", "description", "createdOn"];
	static relationalFields = ["task", "createdBy"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	async save(options?: SaveOptions) {
		const activity = await super.save();
		if (options?.data) {
			const { channels, pubsub } = options.data as MessagePubsubOptions;
			Message.sendTaskActivityMessage(
				channels,
				activity.createdById,
				activity.id,
				pubsub
			).then(() => console.log("Task Activity Message Sent!"));
		}
		return activity;
	}

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
