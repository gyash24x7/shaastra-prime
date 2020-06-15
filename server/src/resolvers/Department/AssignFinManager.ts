import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { AssignFinManagerInput } from "../../inputs/Department";
import { Department } from "../../models/Department";
import { User } from "../../models/User";

@Resolver()
export class AssignFinManagerResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { userId, deptId }: AssignFinManagerInput
	) {
		const { affected } = await Department.update(deptId, {
			finManager: User.findOne(userId)
		});

		return !!affected;
	}
}
