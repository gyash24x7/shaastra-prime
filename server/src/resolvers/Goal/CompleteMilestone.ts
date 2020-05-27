import { MilestoneStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CompleteMilestoneResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(
		@Arg("milestoneId") milestoneId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const milestone = await prisma.milestone.update({
			where: { id: milestoneId },
			data: { status: MilestoneStatus.ACHIEVED }
		});

		return !!milestone;
	}
}
