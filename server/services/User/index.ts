import { UserCreateInput, UserUpdateInput } from "../../../prisma/generated";
import { prisma } from "../../../prisma";

export class UserService {
	async find() {
		return prisma.users();
	}

	async get( id: string ) {
		return prisma.user( { id } );
	}

	async create( data: UserCreateInput ) {
		return prisma.createUser( data );
	}

	async update( id: string, data: UserUpdateInput ) {
		return prisma.updateUser( { where : { id }, data } );
	}

	async remove( id: string ) {
		return prisma.deleteUser( { id } );
	}
}
