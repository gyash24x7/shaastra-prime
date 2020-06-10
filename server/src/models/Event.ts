import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
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
export class Event extends BaseEntity {
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

	@ManyToOne(() => User, (user) => user.eventsUpdated)
	@Field(() => User)
	updatedBy: User;

	@OneToOne(() => Media, { cascade: true })
	@JoinColumn()
	@Field(() => Media, { nullable: true })
	image: Media;

	@ManyToOne(() => Vertical, (vertical) => vertical.events)
	@Field(() => Vertical)
	vertical: Vertical;

	@OneToMany(() => EventTab, (eventTab) => eventTab.event)
	@Field(() => [EventTab])
	eventTabs: EventTab[];

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	registrationType: RegistrationType;

	@OneToMany(() => Registration, (registration) => registration.event)
	@Field(() => [Registration])
	registrations: Registration[];
}
