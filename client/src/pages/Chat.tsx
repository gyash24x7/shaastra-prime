import React from "react";
import { PageProps } from "./Login";
import { Store } from "../typings";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ChatNav } from "../components/Navigation/ChatNav";
import { Chat } from "../components/Chat";
import { ProductNav } from "../components/Navigation/ProductNav";

const mapStateToProps = ( { user }: Store ) => (
	{ user }
);

export const ChatPage = connect( mapStateToProps )( ( { user }: PageProps ) => {
	if ( user?.name ) return (
		<NavigationProvider>
			<LayoutManager
				globalNavigation={ GlobalNav }
				productNavigation={ ProductNav }
				containerNavigation={ ChatNav }
			>
				<Chat/>
			</LayoutManager>
		</NavigationProvider>
	);

	return <Redirect to="/login"/>;

} );
