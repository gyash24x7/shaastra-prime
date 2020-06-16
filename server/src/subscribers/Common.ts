import cuid from "cuid";
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent
} from "typeorm";

@EventSubscriber()
export class CommonSubscriber implements EntitySubscriberInterface {
	beforeInsert(e: InsertEvent<any>) {
		e.entity.id = cuid();
	}
}
