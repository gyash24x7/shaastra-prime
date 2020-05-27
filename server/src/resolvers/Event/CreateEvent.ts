import { MediaType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateEventInput } from "../../inputs/Event/CreateEvent";
import { defaultImageUrl, GraphQLContext } from "../../utils";

@Resolver()
export class CreateEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createEvent(
		@Arg("data") data: CreateEventInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const event = await prisma.event.create({
			data: {
				name: data.name,
				info: data.info,
				paid: data.paid,
				registrationType: data.registrationType,
				vertical: { connect: { id: data.verticalId } },
				updatedBy: { connect: { id: user!.id } },
				image: {
					create: {
						url: data.imageUrl || defaultImageUrl,
						type: MediaType.IMAGE,
						uploadedBy: { connect: { id: user?.id } }
					}
				},
				eventTabs: {
					create: data.eventTabTitles.map((title, i) => ({
						title,
						content: data.eventTabContents[i]
					}))
				}
			}
		});

		return !!event;
	}
}
