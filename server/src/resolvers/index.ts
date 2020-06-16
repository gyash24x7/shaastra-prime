import { ChannelResolver } from "./Channel";
import { DepartmentResolver } from "./Department";
import { EventResolver } from "./Event";
import { GoalResolver } from "./Goal";
import { InvoiceResolver } from "./Invoice";
import { MessageResolver } from "./Message";
import { TaskResolver } from "./Task";
import { UpdateResolver } from "./Update";
import { UserResolver } from "./User";
import { VendorResolver } from "./Vendor";
import { VerticalResolver } from "./Vertical";

export default [
	DepartmentResolver,
	UserResolver,
	ChannelResolver,
	MessageResolver,
	UpdateResolver,
	TaskResolver,
	InvoiceResolver,
	GoalResolver,
	EventResolver,
	VendorResolver,
	VerticalResolver
];
