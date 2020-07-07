import { SetMetadata } from "@nestjs/common";

export const AuthDepts = (...deptNames: string[]) =>
	SetMetadata("departments", deptNames);
