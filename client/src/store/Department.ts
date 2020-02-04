import { observable, computed, action } from "mobx";
import { Department, prisma } from "../typings";

export class DepartmentStore {
	@observable departments: Department[] = [];

	constructor() {
		this.loadDepartments();
	}

	@computed get numberOfDepartments() {
		return this.departments.length;
	}

	@action loadDepartments = async () => {
		this.departments = await prisma.departments();
	};
}
