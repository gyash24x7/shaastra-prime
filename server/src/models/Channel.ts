import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";
import { ChannelType } from "./../utils/index";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@Entity("Channel")
@ObjectType("Channel")
export class Channel {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	description: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column()
	@Field()
	archived: boolean;

	@Column("enum", { enum: ChannelType })
	@Field(() => ChannelType)
	type: ChannelType;

	@Field(() => [User]) members: User[];
	@Field(() => User) createdBy: User;
	@Field(() => [Task]) connectedTasks: Task[];
	@Field(() => [Message]) starredMsgs: Message[];
}
