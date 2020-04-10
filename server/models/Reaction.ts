import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { ReactionType } from "../utils";
import { Message } from "./Message";
import { User } from "./User";

registerEnumType(ReactionType, { name: "ReactionType" });

@ObjectType()
export class Reaction {
	@Field(() => ID) id: number;
	@Field(() => ReactionType) type: ReactionType;
	@Field(() => User) by: User;
	@Field(() => Message) message: Message;
}
