import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";
import { CreateUserInput } from "../inputs/User/CreateUser";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	getUsers() {
		return User.find();
	}

	@Mutation(() => User)
	async createUser(@Arg("data") data: CreateUserInput) {
		const user = User.create(data);
		await user.save();
		return user;
	}
}
