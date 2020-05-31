import React from "react";
import { Department, User } from "../generated";

interface IUserContext {
	user: Partial<User>;
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
	setIsLoggedIn: (val: boolean) => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);
