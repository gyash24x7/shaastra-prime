import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React from "react";
import { Department, User } from "../generated";

interface IDrawerContext {
	setDrawerComponent: (comp: JSX.Element) => void;
	setDrawerProps?: (props: DrawerProps) => void;
}

export const DrawerContext = React.createContext<IDrawerContext | null>(null);

interface IModalContext {
	setModalComponent: (comp: JSX.Element) => void;
	setModalProps: (props: ModalProps) => void;
}

export const ModalContext = React.createContext<IModalContext | null>(null);

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
