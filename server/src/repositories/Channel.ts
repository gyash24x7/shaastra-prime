import { EntityRepository, Repository } from "typeorm";
import { Channel } from "../entities/Channel";

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
	primaryFields = [
		"id",
		"name",
		"description",
		"createdOn",
		"archived",
		"type"
	];

	relationalFields = [
		"starredMsgs",
		"messages",
		"connectedInvoices",
		"connectedTasks",
		"createdBy",
		"members"
	];
}
