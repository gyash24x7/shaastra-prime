import { AddSubDepartmentResolver } from "./AddSubDepartment";
import { AssignFinManagerResolver } from "./AssignFinManager";
import { CreateDepartmentResolver } from "./CreateDepartment";
import { DeleteMemberResolver } from "./DeleteMember";
import { DepartmentFieldResolvers } from "./FieldResolvers";
import { GetDepartmentResolver } from "./GetDepartments";
import { GetDeptMembersResolver } from "./GetDeptMembers";
import { GrantAccessResolver } from "./GrantAccess";

export default [
	AddSubDepartmentResolver,
	CreateDepartmentResolver,
	DepartmentFieldResolvers,
	GetDepartmentResolver,
	GetDeptMembersResolver,
	AssignFinManagerResolver,
	DeleteMemberResolver,
	GrantAccessResolver
];
