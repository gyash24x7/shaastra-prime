import { ChannelCreateInput, ChannelUpdateInput } from "../../prisma/generated";
import { prisma } from "../../prisma";

export class ChannelService {
	async find() {
		return prisma.channels();
	}

	async get( id: string ) {
		return prisma.channel( { id } );
	}

	async create( data: ChannelCreateInput ) {
		return prisma.createChannel( data );
	}

	async update( id: string, data: ChannelUpdateInput ) {
		return prisma.updateChannel( { where : { id }, data } );
	}

	async remove( id: string ) {
		return prisma.deleteChannel( { id } );
	}
}
