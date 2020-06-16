import { EntityRepository, Repository } from "typeorm";
import { Registration } from "../entities/Registration";

@EntityRepository(Registration)
export class RegistrationRepository extends Repository<Registration> {
	primaryFields = ["id", "type"];
	relationalFields = ["team", "event", "participant"];
}
