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

	@ManyToOne(() => Department, (dept) => dept.tasksCreated)
	@Field(() => Department)
	byDept: Department;

	@Column()
	byDeptId: string;

	@ManyToOne(() => Department, (dept) => dept.tasksAssigned)
	@Field(() => Department)
	forDept: Department;

	@Column()
	forDeptId: string;

	@ManyToOne(() => User, (user) => user.tasksCreated)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;

	@ManyToMany(() => User, (user) => user.tasksAssigned)
	@Field(() => [User])
	assignedTo: User[];

	@OneToMany(() => Media, (media) => media.task)
	@Field(() => [Media])
	media: Media[];

	@OneToMany(() => TaskActivity, (activity) => activity.task)
	@Field(() => [TaskActivity])
	activity: TaskActivity[];

	@ManyToMany(() => Channel, (channel) => channel.connectedTasks)
	@JoinTable()
	@Field(() => [Channel])
	channels: Channel[];
}
