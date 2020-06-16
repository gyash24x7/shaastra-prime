import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
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
export class TaskActivity extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "type", "description", "createdOn"];

	static relationalFields = ["task", "createdBy"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
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

	@ManyToOne(() => Task, (task) => task.activity, { lazy: true })
	@Field(() => Task)
	task: Promise<Task>;

	@Column()
	taskId: string;

	@ManyToOne(() => User, (user) => user.taskActivity, { lazy: true })
	createdBy: Promise<User>;

	@Column()
	createdById: string;
}
