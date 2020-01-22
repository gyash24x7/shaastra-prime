import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/selectors/User";
import { Redirect, Route, RouteProps } from "react-router";

export const PublicRoute = ( props: RouteProps ) => {
	const user = useSelector( selectCurrentUser );

	if ( user?.name ) return <Redirect to="/"/>;
	else return <Route { ...props }/>;
};
