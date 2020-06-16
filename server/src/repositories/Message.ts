import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
	primaryFields = ["id", "content", "createdOn", "starred", "type"];
	relationalFields = ["taskActivity", "invoiceActivity", "media", "createdBy"];
}
