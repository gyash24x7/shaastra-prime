import React from "react";
import { Department } from "../generated";

interface IUserContext {
	user?: any;
	isAuthenticated: boolean;
	isVerified: boolean;
}

export const UserContext = React.createContext<IUserContext>({
	isAuthenticated: false,
	isVerified: false
});

interface IDepartmentContext {
	departments: Pick<
		Department,
		"id" | "name" | "shortName" | "subDepartments"
	>[];
}

export const DepartmentContext = React.createContext<IDepartmentContext>({
	departments: []
});
