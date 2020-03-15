import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Media } from "./Media";
import { Message } from "./Message";
import { User } from "./User";

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
	@JoinTable()
	members: User[];

	@Field(() => [Media])
	@OneToMany(
		() => Media,
		media => media.channel
	)
	media: Media[];
}
