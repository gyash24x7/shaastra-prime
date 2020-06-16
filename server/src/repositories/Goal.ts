import { EntityRepository, Repository } from "typeorm";
import { Goal } from "../entities/Goal";

@EntityRepository(Goal)
export class GoalRepository extends Repository<Goal> {
	primaryFields = ["id", "title", "description", "type", "createdOn"];
	relationalFields = ["milestones", "dept"];
}
