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

	@ManyToOne(() => User, (user) => user.messages)
	@Field(() => User)
	createdBy: User;

	@Column()
	@Field()
	starred: boolean;

	@Field(() => Int) likes: number;

	@OneToMany(() => Media, (media) => media.message)
	@Field(() => [Media])
	media: Media[];

	@Column("enum", { enum: MessageType })
	@Field(() => MessageType)
	type: MessageType;

	@ManyToOne(() => TaskActivity)
	@Field(() => TaskActivity, { nullable: true })
	taskActivity?: TaskActivity;

	@ManyToOne(() => InvoiceActivity)
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: InvoiceActivity;

	@ManyToMany(() => User, (user) => user.likedMessages)
	@JoinTable()
	likedBy: User[];

	@ManyToOne(() => Channel, (channel) => channel.messages)
	channel: Channel;
}
