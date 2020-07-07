import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User, UserRole } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<UserRole[]>("roles", context.getHandler());
		if (!roles?.length) return true;

		const request = GqlExecutionContext.create(context).getContext().req;
		const user: User | undefined = request.user;
		if (!user) throw new UnauthorizedException();

		const authorized = roles.includes(user.role);
		if (!authorized) throw new UnauthorizedException();

		return true;
	}
}
