import { User } from "./User";
import { MessageStatus } from "../utils";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	BaseEntity,
	OneToMany
} from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { Channel } from "./Channel";
import { Reaction } from "./Reaction";

registerEnumType(MessageStatus, { name: "MessageStatus" });

@ObjectType()
@Entity()
export class Message extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	content: string;

	@Field(() => String)
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@Column()
	createdById: number;

	@Field(() => User)
	@ManyToOne(
		() => User,
		user => user.messages
	)
	createdBy: User;

	@Column()
	channelId: number;

	@Field(() => Channel)
	@ManyToOne(
		() => Channel,
		channel => channel.messages
	)
	channel: Channel;

	@Field()
	@Column()
	starred: boolean;

	@Field(() => MessageStatus)
	@Column({
		type: "enum",
		enum: MessageStatus,
		default: MessageStatus.NOT_SENT
	})
	status: MessageStatus;

	@Field(() => [Reaction])
	@OneToMany(
		() => Reaction,
		reaction => reaction.message
	)
	reactions: Reaction[];
}
