import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "../utils";
import { User } from "./User";

registerEnumType(MediaType, { name: "MediaType" });

@Entity("Media")
@ObjectType("Media")
export class Media {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	url: string;

	@Column("enum", { enum: MediaType })
	@Field(() => MediaType)
	type: MediaType;

	@Field(() => User) uploadedBy: User;
}
