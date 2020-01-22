import React from "react";
import { PageProps } from "./Login";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ChatNav } from "../components/Navigation/ChatNav";
import { Chat } from "../components/Chat";
import { ProductNav } from "../components/Navigation/ProductNav";
import { selectCurrentUser } from "../store/selectors/User";

export const ChatPage = ( { match }: PageProps ) => {

	const user = useSelector( selectCurrentUser );

	if ( user?.name ) return (
		<NavigationProvider>
			<LayoutManager
				globalNavigation={ GlobalNav }
				productNavigation={ ProductNav }
				containerNavigation={ ChatNav }
			>
				<Chat channelId={ match.params.id }/>
			</LayoutManager>
		</NavigationProvider>
	);

	return <Redirect to="/login"/>;

};
