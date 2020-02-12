import { ReactionType } from "../utils";
import { User } from "./User";
import { Message } from "./Message";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";

registerEnumType(ReactionType, { name: "ReactionType" });

@ObjectType()
@Entity()
export class Reaction {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => ReactionType)
	@Column({ type: "enum", enum: ReactionType })
	type: ReactionType;

	@Column()
	byId: number;

	@Field(() => User)
	@ManyToOne(() => User)
	by: User;

	@Column()
	messageId: number;

	@Field(() => Message)
	@ManyToOne(
		() => Message,
		message => message.reactions
	)
	message: Message;
}
