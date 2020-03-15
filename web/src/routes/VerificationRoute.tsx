import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { VerificationScreen } from "../components/screens/Verification";
import { Loader } from "../components/shared/Loader";
import { useMeQuery } from "../generated";

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
						<VerificationScreen rollNumber={data.me?.rollNumber || ""} />
					)}
				/>
			);
	} else return <Redirect to="/login" />;
};
