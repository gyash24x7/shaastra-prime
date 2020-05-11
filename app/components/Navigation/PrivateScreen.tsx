import {
	createDrawerNavigator,
	DrawerContentComponentProps
} from "@react-navigation/drawer";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";
import { getIconNameValue } from "../../utils";
import globalStyles from "../../utils/globalStyles";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { CustomDrawerItem } from "./DrawerItem";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	return (
		<Navigator drawerContent={DrawerContent}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Equip" component={EquipScreen} />
			<Screen name="Chat" component={ChatScreen} />
			<Screen name="Finbooks" component={FinbooksScreen} />
		</Navigator>
	);
};

const DrawerContent = ({ state, navigation }: DrawerContentComponentProps) => {
	return (
		<Layout style={[globalStyles.darkBg, globalStyles.drawer]}>
			<Layout style={[globalStyles.darkBg, globalStyles.drawerLogoContainer]}>
				<Image
					source={require("../../assets/images/LightLogo.png")}
					style={{ width: 186, height: 108 }}
				/>
			</Layout>
			<Layout style={[globalStyles.darkBg, globalStyles.drawerGroup]}>
				<Text style={globalStyles.drawerGroupHeading}>Apps</Text>
				{state.routes.map((route, index) => (
					<CustomDrawerItem
						key={route.key}
						icon={getIconNameValue(route.name)}
						text={route.name}
						active={state.index === index}
						onTouchEnd={() => navigation.navigate(route.name)}
					/>
				))}
			</Layout>
		</Layout>
	);
};
