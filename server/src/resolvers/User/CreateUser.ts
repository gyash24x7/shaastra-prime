import jwt from "jsonwebtoken";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateUserInput } from "../../inputs/User";
import { Department } from "../../models/Department";
import { User } from "../../models/User";

@Resolver()
export class CreateUserResolver {
	@Mutation(() => [String])
	async createUser(@Arg("data") { departmentId, ...data }: CreateUserInput) {
		const user = await User.create({
			...data,
			department: Department.findOne(departmentId)
		}).save();

		let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

		return [token, ""];
	}
}
