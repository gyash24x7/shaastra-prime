import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { UpdateScreen } from "../Updates";
import { DrawerNav } from "./DrawerNav";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	return (
		<Navigator drawerContent={DrawerNav}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Equip" component={EquipScreen} />
			<Screen name="Chat" component={ChatScreen} />
			<Screen name="Finbooks" component={FinbooksScreen} />
			<Screen name="Updates" component={UpdateScreen} />
		</Navigator>
	);
};
