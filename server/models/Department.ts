import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	OneToMany,
	BaseEntity
} from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Department extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field(() => [String])
	@Column({ type: "simple-array", default: "" })
	subDepartments: string[];

	@Field(() => [User])
	@OneToMany(
		() => User,
		user => user.department
	)
	members: User[];
}
