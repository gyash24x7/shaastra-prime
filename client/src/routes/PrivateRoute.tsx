import React, { createContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";

import { Loader } from "../components/Shared/Loader";
import { ShowError } from "../components/Shared/ShowError";
import { useMeQuery } from "../generated";

export const UserContext = createContext<any>(null);

export const PrivateRoute = (props: RouteProps) => {
	const { data, loading, error } = useMeQuery();

	if (error) return <ShowError />;

	if (loading) return <Loader />;

	if (data?.me) {
		if (data.me.verified) {
			const { __typename, ...rest } = data.me;
			return (
				<UserContext.Provider value={rest}>
					<Route {...props} />
				</UserContext.Provider>
			);
		} else return <Redirect to="/verification" />;
	} else return <Redirect to="/login" />;
};
