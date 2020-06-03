import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React from "react";
import { Department, User } from "../generated";
import { RecursivePartial } from "../generated/types";

export interface DrawerPropsExtended extends DrawerProps {
	extra?: JSX.Element;
}

export interface ModalPropsExtended extends ModalProps {
	extra?: JSX.Element;
}

export interface ToggleDrawerOptions {
	component: JSX.Element;
	props: DrawerPropsExtended;
}

interface IDrawerContext {
	toggleDrawer: (options?: ToggleDrawerOptions) => void;
}

export const DrawerContext = React.createContext<IDrawerContext | null>(null);

export interface ToggleModalOptions {
	component: JSX.Element;
	props: ModalPropsExtended;
}

interface IModalContext {
	toggleModal: (options?: ToggleModalOptions) => void;
}

export const ModalContext = React.createContext<IModalContext | null>(null);

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
