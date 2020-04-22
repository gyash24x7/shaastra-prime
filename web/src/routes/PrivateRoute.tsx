import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { UserContext } from "../utils/context";

export const PrivateRoute = (props: RouteProps) => {
	const { isAuthenticated, isVerified } = useContext(UserContext);
	return isVerified ? (
		<Route {...props} />
	) : isAuthenticated ? (
		<Redirect to="/verification" />
	) : (
		<Redirect to="/login" />
	);
};
