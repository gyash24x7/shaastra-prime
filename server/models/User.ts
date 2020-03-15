import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { UserRole } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { Media } from "./Media";
import { Message } from "./Message";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Field()
	@Column({ unique: true })
	rollNumber: string;

	@Field()
	@Column({ default: "" })
	profilePic: string;

	@Field()
	@Column({ default: "" })
	coverPic: string;

	@Field()
	@Column()
	mobile: string;

	@Field()
	@Column()
	upi: string;

	@Field()
	@Column({ default: "Hi, I am on Shaastra Prime!" })
	about: string;

	@Field(() => UserRole)
	@Column({ type: "enum", enum: UserRole, default: UserRole.COORD })
	role: UserRole;

	@Field()
	@Column({ default: false })
	verified: boolean;

	@Column()
	departmentId: number;

	@Column({ default: "" })
	verificationOTP: string;

	@Column({ default: "" })
	passwordOTP: string;

	@Field(() => Department)
	@ManyToOne(
		() => Department,
		department => department.members
	)
	department: Department;

	@Field(() => [Message])
	@OneToMany(
		() => Message,
		message => message.createdBy
	)
	messages: Message[];

	@Field(() => [Media])
	@OneToMany(
		() => Media,
		media => media.uploadedBy
	)
	media: Media[];

	@Field(() => [Channel])
	@ManyToMany(
		() => Channel,
		channel => channel.members
	)
	channels: Channel[];
}
