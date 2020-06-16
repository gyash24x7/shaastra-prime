import { EntityRepository, Repository } from "typeorm";
import { Update } from "../entities/Update";

@EntityRepository()
export class UpdateRepository extends Repository<Update> {
	primaryFields = ["id", "brief", "subject", "content", "createdOn"];
	relationalFields = ["byDept", "postedBy"];
}
