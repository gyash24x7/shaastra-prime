import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	BaseEntity,
	OneToOne,
	JoinColumn,
	ManyToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Message } from "./Message";
import { Media } from "./Media";

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
	@CreateDateColumn({ type: "timestamp" })
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
	@OneToOne(() => User)
	@JoinColumn()
	createdBy: User;

	@Field(() => [User])
	@ManyToMany(
		() => User,
		user => user.channels
	)
	members: User[];

	@Field(() => [Media])
	@OneToMany(
		() => Media,
		media => media.channel
	)
	media: Media[];
}
