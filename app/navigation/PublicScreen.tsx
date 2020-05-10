import {
	createDrawerNavigator,
	DrawerContentComponentProps
} from "@react-navigation/drawer";
import { Drawer, DrawerItem } from "@ui-kitten/components";
import React from "react";
import { EquipScreen } from "../components/Equip";
import { HomeScreen } from "../components/Home";
import globalStyles from "../utils/globalStyles";

const { Navigator, Screen } = createDrawerNavigator();

export const PublicScreen = () => {
	return (
		<Navigator drawerContent={DrawerContent}>
			<Screen name="Profile" component={HomeScreen} />
			<Screen name="Equip" component={EquipScreen} />
		</Navigator>
	);
};

const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => (
	<Drawer
		selectedIndex={state.index as any}
		onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
		style={globalStyles.darkBg}
		appearance="noDivider"
	>
		<DrawerItem title="Profile" selected={state.index === 0} />
		<DrawerItem title="Equip" selected={state.index === 1} />
	</Drawer>
);
