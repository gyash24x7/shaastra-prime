import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
	AddUsersToChannelInput,
	CreateChannelInput,
	UpdateChannelDescriptionInput
} from "./channel.inputs";

@Injectable()
export class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger("ChannelService");

	async createChannel({ memberIds, ...rest }: CreateChannelInput, user: User) {
		await this.prismaService.channel
			.create({
				data: {
					...rest,
					createdBy: { connect: { id: user.id } },
					members: { connect: [user.id, ...memberIds].map((id) => ({ id })) }
				}
			})
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException(err);
			});
	}

	async addUsersToChannel({ channelId, userIds }: AddUsersToChannelInput) {
		await this.prismaService.channel
			.update({
				where: { id: channelId },
				data: { members: { connect: userIds.map((id) => ({ id })) } }
			})
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException(err);
			});
	}

	async updateChannelDescription({
		channelId,
		description
	}: UpdateChannelDescriptionInput) {
		await this.prismaService.channel
			.update({ where: { id: channelId }, data: { description } })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException(err);
			});
	}

	async archiveChannel(channelId: string) {
		await this.prismaService.channel
			.update({ where: { id: channelId }, data: { archived: true } })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException(err);
			});
	}

	async deleteChannel(channelId: string) {
		await this.prismaService.channel
			.delete({ where: { id: channelId } })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException(err);
			});
	}

	async getChannels({ id }: User) {
		return this.prismaService.channel.findMany({
			where: { members: { some: { id } } }
		});
	}

	async getChannel(id: string) {
		const channel = await this.prismaService.channel.findOne({ where: { id } });
		if (!channel) throw new NotFoundException("Channel Not Found!");
		return channel;
	}
}
