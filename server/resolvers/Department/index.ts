import { AddSubDepartmentResolver } from "./AddSubDepartment";
import { CreateDepartmentResolver } from "./CreateDepartment";
import { DepartmentFieldResolvers } from "./FieldResolvers";
import { GetDepartmentResolver } from "./GetDepartments";
import { GetDeptMembersResolver } from "./GetDeptMembers";

export default [
	AddSubDepartmentResolver,
	CreateDepartmentResolver,
	DepartmentFieldResolvers,
	GetDepartmentResolver,
	GetDeptMembersResolver
];
