import { MessageCreateInput, MessageUpdateInput } from "../../prisma/generated";
import { prisma } from "../../prisma";

export class MessageService {
	async find() {
		return prisma.messages();
	}

	async get( id: string ) {
		return prisma.message( { id } );
	}

	async create( data: MessageCreateInput ) {
		return prisma.createMessage( data );
	}

	async update( id: string, data: MessageUpdateInput ) {
		return prisma.updateMessage( { where : { id }, data } );
	}

	async remove( id: string ) {
		return prisma.deleteMessage( { id } );
	}
}
