import React from "react";
import { Department, User } from "../generated";

interface IDrawerContext {
	component?: JSX.Element;
	visible: boolean;
	onClose?: () => void;
}

export const EquipDrawerContext = React.createContext<IDrawerContext>({
	visible: false
});

interface IUserContext {
	user?:
		| Pick<
				User,
				| "id"
				| "name"
				| "email"
				| "rollNumber"
				| "mobile"
				| "role"
				| "profilePic"
				| "coverPic"
				| "about"
				| "verified"
		  >
		| null
		| undefined;
	isAuthenticated: boolean;
	isVerified: boolean;
}

export const UserContext = React.createContext<IUserContext>({
	isAuthenticated: false,
	isVerified: false
});

interface IDepartmentContext {
	departments: Pick<Department, "id" | "name">[];
}

export const DepartmentContext = React.createContext<IDepartmentContext>({
	departments: []
});
