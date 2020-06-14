import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn
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
export class Task extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = [
		"id",
		"brief",
		"details",
		"status",
		"createdOn",
		"deadline"
	];

	static relationalFields = [
		"byDept",
		"forDept",
		"createdBy",
		"assignedTo",
		"media",
		"activity",
		"channels"
	];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	brief: string;

	@Column()
	@Field()
	details: string;

	@Column("enum", { enum: TaskStatus, default: TaskStatus.NOT_ASSIGNED })
	@Field(() => TaskStatus)
	status: TaskStatus;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column("timestamp")
	@Field()
	deadline: string;

	// db only field for soft delete
	@Column({ default: false })
	deleted: boolean;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Department, (dept) => dept.tasksCreated, { lazy: true })
	@Field(() => Department)
	byDept: Promise<Department>;

	@Column()
	byDeptId: string;

	@ManyToOne(() => Department, (dept) => dept.tasksAssigned, { lazy: true })
	@Field(() => Department)
	forDept: Promise<Department>;

	@Column()
	forDeptId: string;

	@ManyToOne(() => User, (user) => user.tasksCreated, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@Column()
	createdById: string;

	@ManyToMany(() => User, (user) => user.tasksAssigned, { lazy: true })
	@Field(() => [User])
	assignedTo: Promise<User[]>;

	@OneToMany(() => Media, (media) => media.task, { lazy: true })
	@Field(() => [Media])
	media: Promise<Media[]>;

	@OneToMany(() => TaskActivity, (activity) => activity.task, { lazy: true })
	@Field(() => [TaskActivity])
	activity: Promise<TaskActivity[]>;

	@ManyToMany(() => Channel, (channel) => channel.connectedTasks, {
		lazy: true
	})
	@JoinTable()
	@Field(() => [Channel])
	channels: Promise<Channel[]>;
}
