import cuid from "cuid";
import { EntityRepository, Repository } from "typeorm";
import { Channel } from "../entities/Channel";
import { Message } from "../entities/Message";
import { MessageType } from "../utils";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
	primaryFields = ["id", "content", "createdOn", "starred", "type"];
	relationalFields = ["taskActivity", "invoiceActivity", "media", "createdBy"];

	sendSystemMessage(channel: Channel, content: string, createdById: string) {
		return this.save({
			id: cuid(),
			type: MessageType.SYSTEM,
			content,
			createdById,
			channels: [channel]
		});
	}
}
