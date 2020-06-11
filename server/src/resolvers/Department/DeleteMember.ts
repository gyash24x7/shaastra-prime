import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User";

@Resolver()
export class DeleteMemberResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async deleteMember(@Arg("userId") userId: string) {
		const { affected } = await User.delete(userId);
		return !!affected;
	}
}
