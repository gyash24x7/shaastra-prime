import { EntityRepository, Repository } from "typeorm";
import { InvoiceActivity } from "../entities/InvoiceActivity";

@EntityRepository(InvoiceActivity)
export class InvoiceActivityRepository extends Repository<InvoiceActivity> {
	primaryFields = ["id", "type", "createdOn", "description"];
	relationalFields = ["invoice", "createdBy"];
}
