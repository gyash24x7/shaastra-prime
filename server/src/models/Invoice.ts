import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { InvoiceStatus, InvoiceType } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { User } from "./User";
import { Vendor } from "./Vendor";

registerEnumType(InvoiceStatus, { name: "InvoiceStatus" });
registerEnumType(InvoiceType, { name: "InvoiceType" });

@ObjectType("Invoice")
export class Invoice {
	@Field(() => ID) id: string;
	@Field() title: string;
	@Field() date: string;
	@Field() invoiceNumber: string;
	@Field() amount: string;
	@Field() purpose: string;
	@Field(() => InvoiceStatus) status: InvoiceStatus;
	@Field(() => InvoiceType) type: InvoiceType;
	@Field(() => Media) media: Media;
	@Field(() => [InvoiceActivity]) activity: InvoiceActivity[];
	@Field(() => User) uploadedBy: User;
	@Field(() => Department) byDept: Department;
	@Field(() => Vendor) vendor: Vendor;
	@Field(() => [Channel]) channels: Channel[];
}
