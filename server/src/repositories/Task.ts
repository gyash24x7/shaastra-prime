import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entities/Task";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	primaryFields = ["id", "brief", "details", "status", "createdOn", "deadline"];

	relationalFields = [
		"byDept",
		"forDept",
		"createdBy",
		"assignedTo",
		"media",
		"activity",
		"channels"
	];
}
