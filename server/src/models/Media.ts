import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "../utils";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(MediaType, { name: "MediaType" });

@Entity("Media")
@ObjectType("Media")
export class Media {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	url: string;

	@Column("enum", { enum: MediaType })
	@Field(() => MediaType)
	type: MediaType;

	@ManyToOne(() => User, (user) => user.media)
	@Field(() => User)
	uploadedBy: User;

	@ManyToOne(() => Task, (task) => task.media)
	task: Task;

	@ManyToOne(() => Message, (msg) => msg.media)
	message: Message;
}
