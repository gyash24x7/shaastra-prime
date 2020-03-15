import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { Loader } from "../components/shared/Loader";
import { ShowError } from "../components/shared/ShowError";
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
