import { EntityRepository, Repository } from "typeorm";
import { Department } from "../entities/Department";

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
	primaryFields = ["id", "name", "shortName", "subDepartments"];

	relationalFields = [
		"members",
		"tasksAssigned",
		"tasksCreated",
		"goals",
		"finManager",
		"updates",
		"invoicesSubmitted"
	];
}
