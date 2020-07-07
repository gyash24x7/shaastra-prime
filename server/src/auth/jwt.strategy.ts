import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prismaService: PrismaService,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get("JWT_SECRET"),
			ignoteExpiration: false
		});
	}

	async validate({ id }: { id: string }) {
		const user = await this.prismaService.user.findOne({ where: { id } });
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
