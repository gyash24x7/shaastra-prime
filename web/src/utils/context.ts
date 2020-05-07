import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React from "react";
import { Department } from "../generated";

interface IDrawerContext {
	setDrawerComponent: (comp: JSX.Element | undefined) => void;
	setDrawerProps: (props: DrawerProps) => void;
	setChildDrawerComponent: (comp: JSX.Element | undefined) => void;
	setChildDrawerProps: (props: DrawerProps) => void;
	isDrawerOpen: boolean;
}

export const DrawerContext = React.createContext<IDrawerContext | null>(null);

interface IModalContext {
	setModalComponent: (comp: JSX.Element | undefined) => void;
	setModalProps: (props: ModalProps) => void;
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
	departments: Pick<Department, "id" | "name">[];
}

export const DepartmentContext = React.createContext<IDepartmentContext>({
	departments: []
});
