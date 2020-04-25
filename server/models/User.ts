import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserRole } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { Invoice } from "./Invoice";
import { Media } from "./Media";
import { Message } from "./Message";
import { Team } from "./Team";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType()
export class User {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() email: string;
	@Field() rollNumber: string;
	@Field() profilePic: string;
	@Field() coverPic: string;
	@Field() mobile: string;
	@Field() upi: string;
	@Field() about: string;
	@Field(() => UserRole) role: UserRole;
	@Field() verified: boolean;
	@Field(() => [Department]) department: Department[];
	@Field(() => [Message]) messages: Message[];
	@Field(() => [Media]) media: Media[];
	@Field(() => [Channel]) channels: Channel[];
	@Field(() => [Invoice]) invoicesSubmitted: Invoice[];
	@Field(() => [Team]) teams: Team[];
}
