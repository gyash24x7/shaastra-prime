import React from "react";
import { Profile } from "../components/Profile";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ProductNav } from "../components/Navigation/ProductNav";
import { selectCurrentUser } from "../store/selectors/User";

export const ProfilePage = () => {

	const user = useSelector( selectCurrentUser );

	if ( user?.name ) return (
		<NavigationProvider>
			<LayoutManager
				globalNavigation={ GlobalNav }
				productNavigation={ ProductNav }
				containerNavigation={ null }
			>
				<Profile/>
			</LayoutManager>
		</NavigationProvider>
	);

	return <Redirect to="/login"/>;

};
