import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
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
import { MessageType } from "./../utils/index";
import { Channel } from "./Channel";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@Entity("Message")
@ObjectType("Message")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	content: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@ManyToOne(() => User, (user) => user.messages, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@Column()
	@Field()
	starred: boolean;

	@Field(() => Int) likes: number;

	@OneToMany(() => Media, (media) => media.message, { lazy: true })
	@Field(() => [Media])
	media: Promise<Media[]>;

	@Column("enum", { enum: MessageType })
	@Field(() => MessageType)
	type: MessageType;

	@ManyToOne(() => TaskActivity, (activity) => activity.messages, {
		lazy: true
	})
	@Field(() => TaskActivity, { nullable: true })
	taskActivity?: Promise<TaskActivity>;

	@Column({ nullable: true })
	taskActivityId?: string;

	@ManyToOne(() => InvoiceActivity, (activity) => activity.messages, {
		lazy: true
	})
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: Promise<InvoiceActivity>;

	@Column({ nullable: true })
	invoiceActivityId?: string;

	@ManyToMany(() => User, (user) => user.likedMessages, { lazy: true })
	@JoinTable()
	likedBy: Promise<User[]>;

	@ManyToOne(() => Channel, (channel) => channel.messages, { lazy: true })
	channel: Promise<Channel>;

	@Column()
	channelId: string;
}
