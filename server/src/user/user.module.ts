import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserService } from "./user.service";
import { UserResolver } from './user.resolver';

@Module({ imports: [forwardRef(() => AuthModule)], providers: [UserService, UserResolver] })
export class UserModule {}
