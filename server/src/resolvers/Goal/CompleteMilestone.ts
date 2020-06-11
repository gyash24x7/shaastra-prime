import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Milestone } from "../../models/Milestone";
import { MilestoneStatus } from "../../utils";

@Resolver()
export class CompleteMilestoneResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeMilestone(@Arg("milestoneId") milestoneId: string) {
		const { affected } = await Milestone.update(milestoneId, {
			status: MilestoneStatus.ACHIEVED
		});

		return !!affected;
	}
}
