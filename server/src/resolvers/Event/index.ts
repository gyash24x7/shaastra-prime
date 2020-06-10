import { ApproveEventResolver } from "./ApproveEvent";
import { CreateEventResolver } from "./CreateEvent";
import { DeleteEventResolver } from "./DeleteEvent";
import { GetEventsResolver } from "./GetEvents";
import { UpdateEventResolver } from "./UpdateEvent";

export default [
	ApproveEventResolver,
	CreateEventResolver,
	DeleteEventResolver,
	GetEventsResolver,
	UpdateEventResolver
];
