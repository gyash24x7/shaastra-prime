import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { ChannelType } from "../utils/index";
import { Invoice } from "./Invoice";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@Entity("Channel")
@ObjectType("Channel")
export class Channel extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = [
		"id",
		"name",
		"description",
		"createdOn",
		"archived",
		"type"
	];

	static relationalFields = [
		"messages",
		"connectedInvoices",
		"connectedTasks",
		"createdBy",
		"members"
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

	// RELATIONS

	@ManyToMany(() => User, (user) => user.channels, { lazy: true })
	@JoinTable()
	@Field(() => [User])
	members: Promise<User[]>;

	@ManyToOne(() => User, (user) => user.channelsCreated, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@Column()
	createdById: string;

	@ManyToMany(() => Task, (task) => task.channels, { lazy: true })
	@Field(() => [Task])
	connectedTasks: Promise<Task[]>;

	@ManyToMany(() => Invoice, (invoice) => invoice.channels, { lazy: true })
	@Field(() => [Invoice])
	connectedInvoices: Promise<Invoice[]>;

	//computed
	@Field(() => [Message]) starredMsgs: Message[];

	@ManyToMany(() => Message, (message) => message.channels, { lazy: true })
	@JoinTable()
	messages: Promise<Message[]>;
}
