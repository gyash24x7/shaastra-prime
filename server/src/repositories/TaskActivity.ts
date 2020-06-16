import { EntityRepository, Repository } from "typeorm";
import { TaskActivity } from "../entities/TaskActivity";

@EntityRepository(TaskActivity)
export class TaskActivityRepository extends Repository<TaskActivity> {
	primaryFields = ["id", "type", "description", "createdOn"];
	relationalFields = ["task", "createdBy"];
}
