import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddSubDepartmentInput } from "../../inputs/Department/AddSubDepartment";
import { prisma } from "../../prisma";
import { ChannelType, GraphQLContext } from "../../utils";

@Resolver()
export class AddSubDepartmentResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("data") { id, subDept }: AddSubDepartmentInput,
		@Ctx() { req }: GraphQLContext
	) {
		let dept = await prisma.department.findOne({ where: { id } });
		if (!dept) return false;

		dept = await prisma.department.update({
			where: { id },
			data: { subDepartments: { create: { name: subDept } } }
		});

		prisma.channel
			.create({
				data: {
					name: subDept,
					type: ChannelType.GROUP,
					description: "Automatically created Channel for this Sub-Department",
					createdBy: { connect: { id: req.session!.id } }
				}
			})
			.then(() => {
				console.log("Department Channel Automatically Created!");
			});

		return !!dept;
	}
}
