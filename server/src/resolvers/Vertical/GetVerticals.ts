import { Authorized, Query, Resolver } from "type-graphql";
import { Vertical } from "../../models/Vertical";

@Resolver()
export class GetVerticalsResolver {
	@Authorized()
	@Query(() => [Vertical])
	async getVerticals() {
		return await Vertical.find();
	}
}
