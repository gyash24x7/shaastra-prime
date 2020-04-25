import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { SprintStatus } from "../utils";
import { Task } from "./Task";

registerEnumType(SprintStatus, { name: "SprintStatus" });

@ObjectType()
export class Sprint {
	@Field(() => ID) id: string;
	@Field() title: string;
	@Field(() => SprintStatus) status: SprintStatus;
	@Field(() => Task) task: Task;
	@Field() isTemplate: boolean;
}
