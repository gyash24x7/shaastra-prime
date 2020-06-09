import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../utils";
import { Department } from "./Department";

registerEnumType(UserRole, { name: "UserRole" });

@Entity("User")
@ObjectType("User")
export class User {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	email: string;

	@Column()
	@Field()
	rollNumber: string;

	@Column()
	@Field()
	profilePic: string;

	@Column()
	@Field()
	coverPic: string;

	@Column()
	@Field()
	mobile: string;

	@Column()
	@Field()
	upi: string;

	@Column()
	@Field()
	about: string;

	@Column("enum", { enum: UserRole, default: UserRole.COORD })
	@Field(() => UserRole)
	role: UserRole;

	@Column()
	@Field()
	verified: boolean;

	@Field(() => Department) department: Department;
}
