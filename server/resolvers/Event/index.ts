import { ApproveEventResolver } from "./ApproveEvent";
import { CreateEventResolver } from "./CreateEvent";
import { DeleteEventResolver } from "./DeleteEvent";
import { EventFieldResolvers } from "./FieldResolvers";
import { GetEventsResolver } from "./GetEvents";
import { UpdateEventResolver } from "./UpdateEvent";

export default [
	ApproveEventResolver,
	CreateEventResolver,
	DeleteEventResolver,
	EventFieldResolvers,
	GetEventsResolver,
	UpdateEventResolver
];
