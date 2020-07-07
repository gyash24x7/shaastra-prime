import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export const AuthRoles = (...roles: UserRole[]) => SetMetadata("roles", roles);
