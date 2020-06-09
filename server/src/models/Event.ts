import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { RegistrationType } from "../utils";
import { EventTab } from "./EventTab";
import { Media } from "./Media";
import { Registration } from "./Registration";
import { User } from "./User";
import { Vertical } from "./Vertical";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Event")
@ObjectType("Event")
export class Event {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@Column("int")
	@Field(() => Int)
	rank: number;

	@Column()
	@Field()
	info: string;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@Column()
	@Field()
	approved: boolean;

	@Column()
	@Field()
	paid: boolean;

	@Field(() => User) updatedBy: User;
	@Field(() => Media, { nullable: true }) image: Media;
	@Field(() => Vertical) vertical: Vertical;
	@Field(() => [EventTab]) eventTabs: EventTab[];
	@Field(() => RegistrationType) registrationType: RegistrationType;
	@Field(() => [Registration]) registrations: Registration[];
}
