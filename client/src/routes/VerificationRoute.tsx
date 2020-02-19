import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { Loader } from "../components/Shared/Loader";
import { useMeQuery } from "../generated";
import { VerificationPage } from "../pages/Verification";

export const VerificationRoute = (props: RouteProps) => {
	const { data, loading } = useMeQuery();

	if (loading) return <Loader />;

	if (data?.me) {
		if (data.me.verified) return <Redirect to="/" />;
		else
			return (
				<Route
					{...props}
					render={() => (
						<VerificationPage rollNumber={data.me?.rollNumber || ""} />
					)}
				/>
			);
	} else return <Redirect to="/login" />;
};
