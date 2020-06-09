import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";
import { MessageType } from "./../utils/index";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@Entity("Message")
@ObjectType("Message")
export class Message {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	content: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Field(() => User) createdBy: User;

	@Column()
	@Field()
	starred: boolean;

	@Field(() => Int) likes: number;

	@Field(() => [Media]) media: Media[];

	@Column("enum", { enum: MessageType })
	@Field(() => MessageType)
	type: MessageType;

	@Field(() => TaskActivity, { nullable: true }) taskActivity?: TaskActivity;
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: InvoiceActivity;
}
