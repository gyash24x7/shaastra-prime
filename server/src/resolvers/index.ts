import ChannelResolvers from "./Channel";
import DepartmentResolvers from "./Department";
import GoalResolvers from "./Goal";
import InvoiceResolvers from "./Invoice";
import MediaResolvers from "./Media";
import MessageResolvers from "./Message";
import TaskResolvers from "./Task";
import UpdateResolvers from "./Update";
import UserResolvers from "./User";

export const resolvers = [
	...DepartmentResolvers,
	...UserResolvers,
	...ChannelResolvers,
	...MessageResolvers,
	...MediaResolvers,
	...UpdateResolvers,
	...TaskResolvers,
	...InvoiceResolvers,
	...GoalResolvers
];