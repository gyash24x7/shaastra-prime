import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { InvoiceActivityType } from "../utils";
import { Invoice } from "./Invoice";

registerEnumType(InvoiceActivityType, { name: "InvoiceActivityType" });

@ObjectType("InvoiceActivity")
export class InvoiceActivity {
	@Field(() => ID) id: string;
	@Field(() => InvoiceActivityType) type: InvoiceActivityType;
	@Field() on: string;
	@Field(() => Invoice) invoice: Invoice;
}
