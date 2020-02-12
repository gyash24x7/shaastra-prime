import { MediaType } from "../utils";
import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ObjectType, ID, registerEnumType } from "type-graphql";
import { Channel } from "./Channel";

registerEnumType(MediaType, { name: "MediaType" });

@ObjectType()
@Entity()
export class Media {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	url: string;

	@Field(() => MediaType)
	@Column({ type: "enum", enum: MediaType })
	type: MediaType;

	@Column()
	uploadedById: number;

	@Field(() => User)
	@ManyToOne(
		() => User,
		user => user.media
	)
	uploadedBy: User;

	@Column()
	channelId: number;

	@Field(() => Channel)
	@ManyToOne(
		() => Channel,
		channel => channel.media
	)
	channel: Channel;
}
