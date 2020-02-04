import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useObserver } from "mobx-react-lite";
import { useUserStore } from "../store";

export const PrivateRoute = (props: RouteProps) =>
	useObserver(() => {
		const { isAuthenticated } = useUserStore();
		return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
	});
