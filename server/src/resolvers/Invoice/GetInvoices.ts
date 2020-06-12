import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Invoice } from "../../models/Invoice";
import { GraphQLContext, InvoiceStatus } from "../../utils";
import { getInvoiceStatus } from "../../utils/getInvoiceStatus";

@Resolver()
export class GetInvoicesResolver {
	@Authorized()
	@Query(() => [Invoice])
	async getInvoices(
		@Arg("type") type: string,
		@Ctx() { user }: GraphQLContext
	) {
		const userDept = await user.department;

		switch (type) {
			case "REJECTED":
				return (await user.invoicesSubmitted).filter(
					(invoice) => invoice.status === InvoiceStatus.REJECTED
				);

			case "PENDING":
				return (await userDept.invoicesSubmitted).filter(
					(invoice) =>
						invoice.status ===
						getInvoiceStatus(
							user.role,
							user.role !== "COORD" && userDept.name === "FINANCE",
							true
						)
				);

			default:
				return (await user.invoicesSubmitted).filter(
					(invoice) => invoice.status !== InvoiceStatus.REJECTED
				);
		}
	}
}
