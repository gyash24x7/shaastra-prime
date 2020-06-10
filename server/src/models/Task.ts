import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
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
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	brief: string;

	@Column()
	@Field()
	details: string;

	@ManyToOne(() => Department, (dept) => dept.tasksCreated, { lazy: true })
	@Field(() => Department)
	byDept: Promise<Department>;

	@ManyToOne(() => Department, (dept) => dept.tasksAssigned, { lazy: true })
	@Field(() => Department)
	forDept: Promise<Department>;

	@ManyToOne(() => User, (user) => user.tasksCreated, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@ManyToMany(() => User, (user) => user.tasksAssigned, { lazy: true })
	@Field(() => [User])
	assignedTo: Promise<User[]>;

	@Column("enum", { enum: TaskStatus, default: TaskStatus.NOT_ASSIGNED })
	@Field(() => TaskStatus)
	status: TaskStatus;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column("timestamp")
	@Field()
	deadline: string;

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

	@Column({ default: false })
	deleted: boolean;
}
