import { EntityRepository, Repository } from "typeorm";
import { Vertical } from "../entities/Vertical";

@EntityRepository(Vertical)
export class VerticalRepository extends Repository<Vertical> {
	primaryFields = ["id", "rank", "info", "updatedOn"];
	relationalFields = ["image", "events"];
}
