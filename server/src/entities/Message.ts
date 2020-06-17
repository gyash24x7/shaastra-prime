import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
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
export class Message {
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

	@Column({ default: false })
	@Field()
	starred: boolean;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => User, (user) => user.messages)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;

	@OneToMany(() => Media, (media) => media.message)
	@Field(() => [Media])
	media: Media[];

	@OneToOne(() => TaskActivity, { cascade: true, onDelete: "CASCADE" })
	@JoinColumn()
	@Field(() => TaskActivity, { nullable: true })
	taskActivity?: TaskActivity;

	@Column({ nullable: true })
	taskActivityId?: string;

	@OneToOne(() => InvoiceActivity, { cascade: true, onDelete: "CASCADE" })
	@JoinColumn()
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: InvoiceActivity;

	@Column({ nullable: true })
	invoiceActivityId?: string;

	@ManyToMany(() => Channel, (channel) => channel.messages)
	channels: Channel[];
}
