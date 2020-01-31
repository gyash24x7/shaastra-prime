import { Application as ExpressFeathers } from "@feathersjs/express";
import { UserService } from "./services/User";
import { ServiceAddons } from "@feathersjs/feathers";
import { DepartmentService } from "./services/Department";
import { AuthenticationService } from "@feathersjs/authentication/lib";

export interface ServiceTypes {
	users: UserService & ServiceAddons<any>;
	departments: DepartmentService & ServiceAddons<any>;
	authentication: AuthenticationService & ServiceAddons<any>;
}

export type Application = ExpressFeathers<ServiceTypes>;
