import { CreateDepartmentResolver } from "./CreateDepartment";
import { DepartmentFieldResolvers } from "./FieldResolvers";
import { GetDepartmentResolver } from "./GetDepartments";

export default [
	AddSubDepartmentResolver,
	CreateDepartmentResolver,
	DepartmentFieldResolvers,
	GetDepartmentResolver
];
