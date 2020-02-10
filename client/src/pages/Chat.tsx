import React from "react";
import { PageProps } from "../typings";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ChatNav } from "../components/Navigation/ChatNav";
import { Chat } from "../components/Chat";
import { ProductNav } from "../components/Navigation/ProductNav";

export const ChatPage = ({ match }: PageProps) => (
	<NavigationProvider>
		<LayoutManager
			globalNavigation={GlobalNav}
			productNavigation={ProductNav}
			containerNavigation={ChatNav}
		>
			<Chat channelId={match.params.id} />
		</LayoutManager>
	</NavigationProvider>
);
