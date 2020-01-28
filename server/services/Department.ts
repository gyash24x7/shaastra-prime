import {
	DepartmentCreateInput,
	DepartmentUpdateInput
} from "../../prisma/generated";
import { prisma } from "../../prisma";

export class DepartmentService {
	async find() {
		return prisma.departments();
	}

	async get( id: string ) {
		return prisma.department( { id } );
	}

	async create( data: DepartmentCreateInput ) {
		return prisma.createDepartment( data );
	}

	async update( id: string, data: DepartmentUpdateInput ) {
		return prisma.updateDepartment( { where : { id }, data } );
	}

	async remove( id: string ) {
		return prisma.deleteDepartment( { id } );
	}
}
