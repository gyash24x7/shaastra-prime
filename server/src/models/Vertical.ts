import { Field, ID, Int, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Media } from "./Media";
import { User } from "./User";

@Entity("Vertical")
@ObjectType("Vertical")
export class Vertical {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("int")
	@Field(() => Int)
	rank: number;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	info: string;

	@Field(() => User) updatedBy: User;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@Field(() => Media, { nullable: true }) image: Media;
}
