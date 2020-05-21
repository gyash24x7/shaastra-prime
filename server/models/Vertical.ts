import { Field, ID, Int, ObjectType } from "type-graphql";
import { Media } from "./Media";
import { User } from "./User";

@ObjectType()
export class Vertical {
	@Field(() => ID) id: string;
	@Field(() => Int) rank: number;
	@Field() name: string;
	@Field() info: string;
	@Field(() => User) updatedBy: User;
	@Field() updatedOn: string;
	@Field(() => Media, { nullable: true }) image: Media;
}
