import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/selectors/User";
import { Redirect, Route, RouteProps } from "react-router";

export const PrivateRoute = ( props: RouteProps ) => {
	const user = useSelector( selectCurrentUser );
	console.log( user );
	if ( user?.name ) return <Route { ...props }/>;
	else return <Redirect to="/login"/>;
};
