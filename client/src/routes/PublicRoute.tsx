import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useUserStore } from "../store";

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated } = useUserStore();
	return isAuthenticated ? <Redirect to="/" /> : <Route {...props} />;
};
