import cuid from "cuid";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
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
	// STATIC FIELDS

	static primaryFields = ["id", "content", "createdOn", "starred", "type"];

	static relationalFields = [
		"taskActivity",
		"invoiceActivity",
		"media",
		"createdBy"
	];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

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

	@ManyToOne(() => User, (user) => user.messages, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@Column()
	createdById: string;

	@OneToMany(() => Media, (media) => media.message, { lazy: true })
	@Field(() => [Media])
	media: Promise<Media[]>;

	@OneToOne(() => TaskActivity, { lazy: true })
	@JoinColumn()
	@Field(() => TaskActivity, { nullable: true })
	taskActivity?: Promise<TaskActivity>;

	@OneToOne(() => InvoiceActivity, { lazy: true })
	@JoinColumn()
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: Promise<InvoiceActivity>;

	@ManyToMany(() => User, (user) => user.likedMessages, { lazy: true })
	@JoinTable()
	likedBy: Promise<User[]>;

	@ManyToMany(() => Channel, (channel) => channel.messages, { lazy: true })
	channels: Promise<Channel[]>;
}
