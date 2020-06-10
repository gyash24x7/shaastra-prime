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

	@ManyToOne(() => Department, (dept) => dept.tasksCreated)
	@Field(() => Department)
	byDept: Department;

	@ManyToOne(() => Department, (dept) => dept.tasksAssigned)
	@Field(() => Department)
	forDept: Department;

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

	@OneToMany(() => Media, (media) => media.task)
	@Field(() => [Media])
	media: Media[];

	@OneToMany(() => TaskActivity, (activity) => activity.task)
	@Field(() => [TaskActivity])
	activity: TaskActivity[];

	@ManyToMany(() => Channel)
	@JoinTable()
	@Field(() => [Channel])
	channels: Channel[];

	@Column({ default: false })
	deleted: boolean;
}
