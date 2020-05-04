import ChannelResolvers from "./Channel";
import DepartmentResolvers from "./Department";
import UserResolvers from "./User";

export const resolvers = [
	...DepartmentResolvers,
	...UserResolvers,
	...ChannelResolvers
];
