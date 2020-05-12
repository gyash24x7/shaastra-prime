import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React from "react";
import { Department } from "../generated";

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
