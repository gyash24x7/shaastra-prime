import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TypeChannel } from "@prisma/client";
import { UserType } from "../user/user.type";

registerEnumType(TypeChannel, { name: "TypeChannel" });

@ObjectType("Channel")
export class ChannelType {
	@Field(() => ID) id: string;
	@Field(() => String) name: string;
	@Field(() => String) description: string;
	@Field(() => String) createdOn: string;
	@Field(() => UserType) user: UserType;
	@Field(() => [UserType]) members: UserType[];
	@Field(() => Boolean) archived: Boolean;
	@Field(() => TypeChannel) type: TypeChannel;
}
