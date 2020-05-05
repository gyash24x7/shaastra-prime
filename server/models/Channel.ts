import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { ChannelType } from "./../utils/index";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@ObjectType()
export class Channel {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() description: string;
	@Field() createdAt: string;
	@Field() archived: boolean;
	@Field(() => ChannelType) type: ChannelType;
	@Field(() => [User]) members: User[];
	@Field(() => User) createdBy: User;
}
