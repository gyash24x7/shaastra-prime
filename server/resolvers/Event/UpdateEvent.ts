import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateEventInput } from "../../inputs/Event/UpdateEvent";
import { prisma } from "../../prisma";
import { defaultImageUrl, GraphQLContext } from "../../utils";

@Resolver()
export class UpdateEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async updateEvent(
		@Arg("data") data: UpdateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		const event = await prisma.event.update({
			where: { id: data.id },
			data: {
				name: data.name,
				info: data.info,
				paid: data.paid,
				registrationType: data.registrationType,
				image: {
					update: {
						url: data.imageUrl || defaultImageUrl,
						uploadedBy: { connect: { id: user!.id } }
					}
				},
				updatedBy: { connect: { id: user!.id } },
				updatedOn: moment().toDate(),
				eventTabs: {
					updateMany: data.eventTabIds.map((id, i) => ({
						where: { id },
						data: {
							title: data.eventTabTitles[i],
							content: data.eventTabContents[i]
						}
					}))
				}
			}
		});
		return !!event;
	}
}
