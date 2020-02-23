import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

import { Loader } from "../components/Shared/Loader";
import { ShowError } from "../components/Shared/ShowError";
import { useMeQuery } from "../generated";

export const PublicRoute = (props: RouteProps) => {
	const { data, loading, error } = useMeQuery();

	if (error) return <ShowError />;

	if (loading) return <Loader />;

	if (data?.me) {
		if (data.me.verified) return <Redirect to="/" />;
		else return <Redirect to="/verification" />;
	} else return <Route {...props} />;
};
