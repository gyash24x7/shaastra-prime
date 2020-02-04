import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Department extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@Field(() => String)
	@Column()
	name: string;

	@Field(() => [String])
	@Column({ array: true })
	subDepartments: string;

	@Field(() => User)
	@OneToMany(
		() => User,
		user => user.department,
		{ nullable: true }
	)
	members: User;
}
