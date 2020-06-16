import { EntityRepository, Repository } from "typeorm";
import { Invoice } from "../entities/Invoice";

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
	primaryFields = [
		"id",
		"title",
		"date",
		"invoiceNumber",
		"amount",
		"purpose",
		"status",
		"type"
	];

	relationalFields = [
		"media",
		"activity",
		"uploadedBy",
		"byDept",
		"vendor",
		"channels"
	];
}
