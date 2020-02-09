import {
	Mutation,
	Arg,
	Resolver,
	Query,
	FieldResolver,
	Root,
	Ctx
} from "type-graphql";
import { CreateUserInput } from "../inputs/User/CreateUser";
import { LoginInput } from "../inputs/User/Login";
import { User } from "../models/User";
import { Department } from "../models/Department";
import bcrypt from "bcryptjs";
import { GraphQLContext } from "../utils";

@Resolver(User)
export class UserResolver {
	@Mutation(() => User)
	async createUser(@Arg("data") data: CreateUserInput) {
		const hashedPassword = await bcrypt.hash(data.password, 13);
		const user = await User.create({
			...data,
			password: hashedPassword
		}).save();
		return user;
	}

	@Query(() => [User])
	async getUsers() {
		return User.find();
	}

	@Mutation(() => User, { nullable: true })
	async login(
		@Arg("data") { rollNumber, password }: LoginInput,
		@Ctx() { req }: GraphQLContext
	): Promise<User | null> {
		const user = await User.findOne({ where: { rollNumber } });
		if (!user) return null;

		const valid = bcrypt.compare(password, user.password);
		if (!valid) return null;

		req.session!.userId = user.id;
		return user;
	}

	@FieldResolver(() => Department)
	async department(@Root() { departmentId }: User) {
		return Department.findOne(departmentId);
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;
		if (!id) return null;

		return User.findOne(id);
	}
}
