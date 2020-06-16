import { EntityRepository, Repository } from "typeorm";
import { Milestone } from "../entities/Milestone";

@EntityRepository(Milestone)
export class MilestoneRepository extends Repository<Milestone> {
	primaryFields = ["id", "title", "status"];
	relationalFields = ["goal"];
}
