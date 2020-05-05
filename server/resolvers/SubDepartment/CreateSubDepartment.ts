import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateSubDepartmentInput } from "../../inputs/SubDepartment/CreateSubDepartment";
import { prisma } from "../../prisma/index";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class CreateSubDepartmentResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createSubDepartment(
		@Arg("data") { name, members }: CreateSubDepartmentInput,
		@Ctx() { req }: GraphQLContext
	) {
		const userId: string = req.session!.id;

		const dept = await prisma.user
			.findOne({ where: { id: userId } })
			.department();

		const team = await prisma.subDepartment
			.create({
				data: {
					name,
					members: { connect: members.map((id) => ({ id })) },
					department: { connect: { id: dept!.id } }
				}
			})
			.catch((err) => {
				console.log("Error Creating Team!");
				throw new Error(err);
			});

		prisma.channel
			.create({
				data: {
					name,
					type: ChannelType.GROUP,
					description: "Automatically created Channel for this Sub-Department",
					createdBy: { connect: { id: req.session!.id } }
				}
			})
			.then(() => {
				console.log("Department Channel Automatically Created!");
			});

		return !!team;
	}
}
