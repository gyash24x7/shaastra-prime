import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { InvoiceStatus, InvoiceType } from "../utils";
import { Department } from "./Department";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { User } from "./User";
import { Vendor } from "./Vendor";

registerEnumType(InvoiceStatus, { name: "InvoiceStatus" });
registerEnumType(InvoiceType, { name: "InvoiceType" });

@ObjectType()
export class Invoice {
	@Field(() => ID) id: number;
	@Field() title: string;
	@Field() date: string;
	@Field() invoiceNumber: string;
	@Field() amount: string;
	@Field() purpose: string;
	@Field(() => InvoiceStatus) status: InvoiceStatus;
	@Field() type: InvoiceType;
	@Field() media: Media;
	@Field(() => [InvoiceActivity]) activity: InvoiceActivity[];
	@Field(() => User) uploadedBy: User;
	@Field(() => Department) byDept: Department;
	@Field(() => Vendor) vendor: Vendor;
}
