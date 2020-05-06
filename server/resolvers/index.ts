import ChannelResolvers from "./Channel";
import DepartmentResolvers from "./Department";
import MediaResolvers from "./Media";
import MessageResolvers from "./Message";
import UserResolvers from "./User";

export const resolvers = [
	...DepartmentResolvers,
	...UserResolvers,
	...ChannelResolvers,
	...MessageResolvers,
	...MediaResolvers
];
