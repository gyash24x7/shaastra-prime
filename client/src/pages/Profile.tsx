import React from "react";
import { Profile } from "../components/Profile";
import { PageProps } from "./Login";
import { Store } from "../typings";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ProductNav } from "../components/Navigation/ProductNav";

const mapStateToProps = ( { user }: Store ) => (
	{ user }
);

export const ProfilePage = connect( mapStateToProps )( ( { user }: PageProps ) => {
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

} );
