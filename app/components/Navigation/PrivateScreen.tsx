import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { UserContext } from "../../utils/context";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { UpdateScreen } from "../Updates";
import { DrawerNav } from "./DrawerNav";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	const { isAuthenticated } = useContext(UserContext);
	const navigation = useNavigation();

	if (!isAuthenticated) {
		navigation.navigate("Login");
	}

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
