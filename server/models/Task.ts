import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { TaskStatus } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { Media } from "./Media";
import { User } from "./User";

registerEnumType(TaskStatus, { name: "TaskStatus" });

@ObjectType()
export class Task {
	@Field(() => ID) id: number;
	@Field() brief: string;
	@Field() details: string;
	@Field(() => Department) byDept: Department;
	@Field(() => Department) forDept: Department;
	@Field(() => User) createdBy: User;
	@Field(() => [User]) assignedTo: User[];
	@Field(() => TaskStatus) status: TaskStatus;
	@Field() createdAt: string;
	@Field() deadline: string;
	@Field(() => Channel) channel: Channel;
	@Field(() => [Media]) media: Media[];
}
