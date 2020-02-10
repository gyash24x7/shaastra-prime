import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useMeQuery } from "../generated";
import { ShowError } from "../components/Shared/ShowError";
import { Loader } from "../components/Shared/Loader";
import { VerificationRoute } from "./VerificationRoute";

export const PublicRoute = (props: RouteProps) => {
	const { data, loading, error } = useMeQuery();

	if (error) return <ShowError />;

	if (loading) return <Loader />;

	if (data?.me?.id && data?.me?.verified) return <Redirect to="/" />;
	else if (!data?.me?.verified) return <VerificationRoute />;
	else return <Route {...props} />;
};
