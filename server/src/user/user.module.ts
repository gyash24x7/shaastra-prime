import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MailjetModule } from "../mailjet/mailjet.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
	imports: [forwardRef(() => AuthModule), PrismaModule, MailjetModule],
	providers: [UserService, UserResolver]
})
export class UserModule {}
