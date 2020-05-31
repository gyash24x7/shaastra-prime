import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useMeQuery } from "../../generated";
import { UserContext } from "../../utils/context";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { UpdateScreen } from "../Updates";
import { DrawerNav } from "./DrawerNav";
import { LoadingScreen } from "./LoadingScreen";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	const { data, error } = useMeQuery();
	const navigation = useNavigation();

	if (error) {
		console.log(error);
		navigation.navigate("Error", { message: "Internal Server Error" });
	}

	if (data?.me) {
		return (
			<UserContext.Provider value={{ user: data.me }}>
				<Navigator drawerContent={DrawerNav}>
					<Screen name="Home" component={HomeScreen} />
					<Screen name="Equip" component={EquipScreen} />
					<Screen name="Chat" component={ChatScreen} />
					<Screen name="Finbooks" component={FinbooksScreen} />
					<Screen name="Updates" component={UpdateScreen} />
				</Navigator>
			</UserContext.Provider>
		);
	}

	return <LoadingScreen />;
};
