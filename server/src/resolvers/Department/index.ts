import { AddSubDepartmentResolver } from "./AddSubDepartment";
import { AssignFinManagerResolver } from "./AssignFinManager";
import { CreateDepartmentResolver } from "./CreateDepartment";
import { DeleteMemberResolver } from "./DeleteMember";
import { GetDepartmentResolver } from "./GetDepartments";
import { GetDeptMembersResolver } from "./GetDeptMembers";
import { GrantAccessResolver } from "./GrantAccess";

export default [
	AddSubDepartmentResolver,
	CreateDepartmentResolver,
	GetDepartmentResolver,
	GetDeptMembersResolver,
	AssignFinManagerResolver,
	DeleteMemberResolver,
	GrantAccessResolver
];
