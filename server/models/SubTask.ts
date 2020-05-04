import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { SubTaskStatus } from "../utils";
import { Task } from "./Task";

registerEnumType(SubTaskStatus, { name: "SubTaskStatus" });

@ObjectType()
export class SubTask {
	@Field(() => ID) id: string;
	@Field() title: string;
	@Field(() => SubTaskStatus) status: SubTaskStatus;
	@Field(() => Task) task: Task;
}
