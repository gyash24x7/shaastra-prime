import { Service } from "feathers-memory";
import { Application } from "../types";
import {
	DepartmentCreateInput,
	DepartmentUpdateInput
} from "../../prisma/generated";
import { prisma } from "../../prisma";

export class DepartmentService extends Service {
	constructor(app: Application) {
		super();
		console.log(app.get("public"));
	}

	async find() {
		return prisma.departments();
	}

	async get(id: string) {
		return prisma.department({ id });
	}

	async create(data: DepartmentCreateInput) {
		return prisma.createDepartment(data);
	}

	async update(id: string, data: DepartmentUpdateInput) {
		return prisma.updateDepartment({ where: { id }, data });
	}

	async remove(id: string) {
		return prisma.deleteDepartment({ id });
	}
}

export default (app: Application) => {
	app.use("/departments", new DepartmentService(app));
};
