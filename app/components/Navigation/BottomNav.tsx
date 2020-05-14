import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import React from "react";
import { getIconNameValue } from "../../utils";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

export const BottomNav = ({ navigation, state }: BottomTabBarProps) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}
		style={[globalStyles.tabBar]}
	>
		{state.routes.map((route, i) => (
			<BottomNavigationTab
				title={route.name.toUpperCase()}
				key={route.key}
				icon={(props) => (
					<SwitchingIcon
						name={getIconNameValue(route.name)}
						{...props}
						isActive={state.index === i}
					/>
				)}
			/>
		))}
	</BottomNavigation>
);
