import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { PrivateLayout } from "../components/shared/PrivateLayout";
import { UserContext } from "../utils/context";

export const PrivateRoute = (props: RouteProps) => {
	const { isAuthenticated, isVerified } = useContext(UserContext);
	return isVerified ? (
		<PrivateLayout>
			<Route {...props} />
		</PrivateLayout>
	) : isAuthenticated ? (
		<Redirect to="/verification" />
	) : (
		<Redirect to="/login" />
	);
};
