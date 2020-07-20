import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { MailjetModule } from './mailjet/mailjet.module';
import { ChannelModule } from './channel/channel.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			context: ({ req }) => ({ req }),
			cors: ["http://localhost:3000"],
			installSubscriptionHandlers: true
		}),
		AuthModule,
		UserModule,
		PrismaModule,
		MailjetModule,
		ChannelModule
	]
})
export class AppModule {}
