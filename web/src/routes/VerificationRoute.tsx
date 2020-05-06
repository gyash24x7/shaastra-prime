import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { PublicLayout } from "../components/shared/PublicLayout";
import { UserContext } from "../utils/context";

export const VerificationRoute = (props: RouteProps) => {
	const { isVerified, isAuthenticated } = useContext(UserContext);
	return isVerified ? (
		<Redirect to="/" />
	) : !isAuthenticated ? (
		<Redirect to="/login" />
	) : (
		<PublicLayout>
			<Route {...props} />
		</PublicLayout>
	);
};
