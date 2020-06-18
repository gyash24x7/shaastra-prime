import cuid from "cuid";
import {
	Field,
	ID,
	ObjectType,
	PubSubEngine,
	registerEnumType
} from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	SaveOptions
} from "typeorm";
import { MessagePubsubOptions, MessageType } from "../utils/index";
import { Channel } from "./Channel";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@Entity("Message")
@ObjectType("Message")
export class Message extends BaseEntity {
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

	static sendTaskActivityMessage(
		channels: Channel[],
		createdById: string,
		taskActivityId: string,
		pubsub: PubSubEngine
	) {
		const message = new Message();
		message.channels = channels;
		message.content = "";
		message.type = MessageType.TASK_ACTIVITY;
		message.createdById = createdById;
		message.taskActivityId = taskActivityId;

		return message.save({ data: { channels, pubsub } });
	}

	async save(options?: SaveOptions) {
		const message = await super.save();
		if (options?.data) {
			const { pubsub, channels } = options.data as MessagePubsubOptions;
			Promise.all(
				channels.map(({ id }) => pubsub.publish(id, message))
			).then(() => console.log("Message published on Channels!"));
		}

		return message;
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
