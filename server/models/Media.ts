import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { MediaType } from "../utils";
import { Channel } from "./Channel";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(MediaType, { name: "MediaType" });

@ObjectType()
export class Media {
	@Field(() => ID) id: string;
	@Field() url: string;
	@Field(() => MediaType) type: MediaType;
	@Field(() => User) uploadedBy: User;
	@Field(() => Channel) channel: Channel;
	@Field(() => Task) task?: Task;
}
