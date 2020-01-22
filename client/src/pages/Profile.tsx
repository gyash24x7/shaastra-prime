import React from "react";
import { Profile } from "../components/Profile";
import { LayoutManager, NavigationProvider } from "@atlaskit/navigation-next";
import { GlobalNav } from "../components/Navigation/GlobalNav";
import { ProductNav } from "../components/Navigation/ProductNav";

export const ProfilePage = () => (
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
