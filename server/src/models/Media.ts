import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { MediaType } from "../utils";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(MediaType, { name: "MediaType" });

@Entity("Media")
@ObjectType("Media")
export class Media extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	url: string;

	@Column("enum", { enum: MediaType })
	@Field(() => MediaType)
	type: MediaType;

	@ManyToOne(() => User, (user) => user.media, { lazy: true })
	@Field(() => User)
	uploadedBy: Promise<User>;

	@Column()
	uploadedById: string;

	@ManyToOne(() => Task, (task) => task.media, { lazy: true })
	task: Promise<Task>;

	@Column({ nullable: true })
	taskId?: string;

	@ManyToOne(() => Message, (msg) => msg.media, { lazy: true })
	message: Promise<Message>;

	@Column({ nullable: true })
	messageId?: string;
}
