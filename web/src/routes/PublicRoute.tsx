import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { PublicLayout } from "../components/shared/PublicLayout";
import { UserContext } from "../utils/context";

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated, isVerified } = useContext(UserContext);
	return !isAuthenticated ? (
		<PublicLayout>
			<Route {...props} />
		</PublicLayout>
	) : !isVerified ? (
		<Redirect to="/verification" />
	) : (
		<Redirect to="/" />
	);
};
