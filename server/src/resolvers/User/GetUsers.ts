import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";

@Resolver()
export class GetUsersResolver {
	@Query(() => [User])
	async getUsers() {
		return User.find();
	}

	@Authorized()
	@Query(() => User)
	async getUser(@Arg("userId") userId: string) {
		return User.findOne(userId);
	}
}
