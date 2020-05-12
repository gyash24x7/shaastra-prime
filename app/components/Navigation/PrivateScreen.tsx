import {
	createDrawerNavigator,
	DrawerContentComponentProps
} from "@react-navigation/drawer";
import {
	Drawer,
	DrawerGroup,
	DrawerItem,
	IndexPath,
	Text
} from "@ui-kitten/components";
import React from "react";
import { getIconNameValue } from "../../utils";
import globalStyles from "../../utils/globalStyles";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import { UserCard } from "../Shared/UserCard";

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
		<Drawer
			header={() => <UserCard size="small" />}
			selectedIndex={new IndexPath(state.index, 0)}
			onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
			style={globalStyles.drawerNavigation}
		>
			<DrawerGroup
				title={(props) => (
					<Text style={[props?.style, globalStyles.heading]}>Apps</Text>
				)}
			>
				{state.routes.map(({ key, name }) => (
					<DrawerItem
						key={key}
						title={(props) => (
							<Text style={[props?.style, globalStyles.heading]}>{name}</Text>
						)}
						accessoryLeft={(props) => (
							<SwitchingIcon
								{...props}
								isActive={false}
								name={getIconNameValue(name)}
							/>
						)}
					/>
				))}
			</DrawerGroup>
		</Drawer>
	);
};
