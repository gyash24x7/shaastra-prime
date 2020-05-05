import ChannelResolvers from "./Channel";
import DepartmentResolvers from "./Department";
import SubDepartmentResolvers from "./SubDepartment";
import UserResolvers from "./User";

export const resolvers = [
	...DepartmentResolvers,
	...UserResolvers,
	...ChannelResolvers,
	...SubDepartmentResolvers
];
