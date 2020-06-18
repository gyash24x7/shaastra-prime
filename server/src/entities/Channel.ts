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
	PrimaryColumn,
	SaveOptions
} from "typeorm";
import { ChannelSaveOptionsData, ChannelType, MessageType } from "../utils";
import { Invoice } from "./Invoice";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@Entity("Channel")
@ObjectType("Channel")
export class Channel extends BaseEntity {
	// ADDITIONAL PROPERTIES

	static primaryFields = [
		"id",
		"name",
		"description",
		"createdOn",
		"archived",
		"type"
	];

	static relationalFields = [
		"starredMsgs",
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
		this.archived = false;
	}

	async save(options?: SaveOptions) {
		const channel = await super.save();
		if (options?.data) {
			const { user, pubsub, content } = options.data as ChannelSaveOptionsData;
			const message = new Message();
			message.type = MessageType.SYSTEM;
			message.content = content;
			message.createdById = user.id;
			message.channels = [channel];

			message.save({ data: { channels: [channel], pubsub } }).then(() => {
				console.log("System Message Sent!");
			});
		}
		return channel;
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

	@ManyToMany(() => User, (user) => user.channels)
	@JoinTable()
	@Field(() => [User])
	members: User[];

	@ManyToOne(() => User, (user) => user.channelsCreated)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;

	@ManyToMany(() => Task, (task) => task.channels)
	@Field(() => [Task])
	connectedTasks: Task[];

	@ManyToMany(() => Invoice, (invoice) => invoice.channels)
	@Field(() => [Invoice])
	connectedInvoices: Invoice[];

	@ManyToMany(() => Message, (message) => message.channels)
	@JoinTable()
	messages: Message[];
}
