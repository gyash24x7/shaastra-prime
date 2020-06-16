import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn
} from "typeorm";
import { MessageType } from "../utils/index";
import { Channel } from "./Channel";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@Entity("Message")
@ObjectType("Message")
export class Message extends BaseEntity {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	content: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column("enum", { enum: MessageType })
	@Field(() => MessageType)
	type: MessageType;

	@Column()
	@Field()
	starred: boolean;

	// computed
	@Field(() => Int) likes: number;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => User, (user) => user.messages)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;

	@OneToMany(() => Media, (media) => media.message)
	@Field(() => [Media])
	media: Media[];

	@OneToOne(() => TaskActivity)
	@JoinColumn()
	@Field(() => TaskActivity, { nullable: true })
	taskActivity?: TaskActivity;

	@OneToOne(() => InvoiceActivity)
	@JoinColumn()
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: InvoiceActivity;

	@ManyToMany(() => User, (user) => user.likedMessages)
	@JoinTable()
	likedBy: User[];

	@ManyToMany(() => Channel, (channel) => channel.messages)
	channels: Channel[];
}
