import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MailjetModule } from "../mailjet/mailjet.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	providers: [AuthService, JwtStrategy, UserService],
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get("JWT_SECRET"),
					signOptions: { expiresIn: 7 * 24 * 60 * 60 }
				};
			},
			inject: [ConfigService],
			imports: [ConfigModule, PrismaModule]
		}),
		forwardRef(() => UserModule),
		PrismaModule,
		MailjetModule
	],
	exports: [AuthService, PassportModule, JwtStrategy]
})
export class AuthModule {}
