import { MilestoneStatus } from "@prisma/client";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class CompleteMilestoneResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const milestone = await prisma.milestone.update({
			where: { id: milestoneId },
			data: { status: MilestoneStatus.ACHIEVED }
		});

		return !!milestone;
	}
}
