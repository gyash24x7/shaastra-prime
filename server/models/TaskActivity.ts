import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { TaskActivityType } from "./../utils/index";
import { Channel } from "./Channel";
import { Task } from "./Task";

registerEnumType(TaskActivityType, { name: "TaskActivityType" });

@ObjectType()
export class TaskActivity {
	@Field(() => ID) id: string;
	@Field(() => TaskActivityType) type: TaskActivityType;
	@Field(() => Channel, { nullable: true }) channel?: Channel;
	@Field(() => Task) task: Task;
	@Field() createdAt: string;
}
