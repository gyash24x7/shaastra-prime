import { InvoiceStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Invoice } from "../../models/Invoice";
import { APPROVAL_STAGES, GraphQLContext } from "../../utils";

@Resolver()
export class GetInvoicesResolver {
	@Authorized()
	@Query(() => [Invoice])
	async getInvoices(
		@Arg("type") type: string,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		switch (type) {
			case "REJECTED":
				return prisma.invoice.findMany({
					where: {
						uploadedById: user!.id,
						status: InvoiceStatus.REJECTED
					}
				});
			case "PENDING":
				const currentStageIndex = APPROVAL_STAGES.findIndex((stage) => {
					if (user?.department.name === "FINANCE") {
						if (user.role === "HEAD") return stage === "FIN_MAANGER";
						if (user.role === "CORE") return stage === "FIN_CORE";
					}
					return stage === user!.role;
				});

				return prisma.invoice.findMany({
					where: {
						byDeptId: user!.department.id,
						status: APPROVAL_STAGES[currentStageIndex - 1] as InvoiceStatus
					}
				});
			default:
				return prisma.invoice.findMany({
					where: {
						uploadedById: user!.id,
						status: { not: InvoiceStatus.REJECTED }
					}
				});
		}
	}
}
