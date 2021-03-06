import React from "react";
import { Department, User } from "../generated";
import { RecursivePartial } from "../generated/types";

interface IUserContext {
	user: RecursivePartial<User>;
}

export const UserContext = React.createContext<IUserContext | null>(null);

interface IDepartmentContext {
	departments: Pick<
		Department,
		"id" | "name" | "shortName" | "subDepartments"
	>[];
}

export const DepartmentContext = React.createContext<IDepartmentContext>({
	departments: []
});

interface IAuthContext {
	setAuthStatus: (val: boolean[]) => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);
