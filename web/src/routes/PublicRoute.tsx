import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { UserContext } from "../utils/context";

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated, isVerified } = useContext(UserContext);
	return !isAuthenticated ? (
		<Route {...props} />
	) : !isVerified ? (
		<Redirect to="/verification" />
	) : (
		<Redirect to="/login" />
	);
};
