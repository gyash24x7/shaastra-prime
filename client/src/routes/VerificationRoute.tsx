import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useMeQuery } from "../generated";
import { ShowError } from "../components/Shared/ShowError";
import { Loader } from "../components/Shared/Loader";

export const VerificationRoute = (props: RouteProps) => {
	const { data, loading, error } = useMeQuery();

	if (error) return <ShowError />;

	if (loading) return <Loader />;

	if (data?.me?.id) {
		if (data.me.verified) return <Redirect to="/" />;
		else return <Route {...props} />;
	} else return <Redirect to="/login" />;
};
