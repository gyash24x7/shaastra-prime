import { ChannelResolver } from "./Channel";
import { DepartmentResolver } from "./Department";
import UserResolvers from "./User";

export const resolvers = [
	DepartmentResolver,
	...UserResolvers,
	ChannelResolver
];
