import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Vertical } from "../../models/Vertical";

@Resolver()
export class DeleteVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async deleteVertical(@Arg("id") id: string) {
		const { affected } = await Vertical.delete(id);
		return !!affected;
	}
}
