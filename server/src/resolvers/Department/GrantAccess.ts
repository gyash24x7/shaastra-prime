import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { GrantAccessInput } from "../../inputs/Department";
import { User } from "../../models/User";

@Resolver()
export class GrantAccessResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async grantAccess(@Arg("data") { userId, role }: GrantAccessInput) {
		const { affected } = await User.update(userId, { role });
		return !!affected;
	}
}
