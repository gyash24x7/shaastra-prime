import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	BaseEntity,
	OneToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	description: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@Column({ default: false })
	archived: boolean;

	@Field(() => [Message])
	@OneToMany(
		() => Message,
		message => message.channel
	)
	messages: Message[];

	@Column()
	createdById: number;

	@Field(() => User)
	@OneToOne(
		() => User,
		user => user.channelsCreated
	)
	createdBy: User;
}
