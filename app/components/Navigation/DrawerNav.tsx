import { useApolloClient } from "@apollo/client";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer, DrawerItem, IndexPath, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { AsyncStorage } from "react-native";
import { getIconNameValue } from "../../utils";
import { AuthContext, UserContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import { UserCard } from "../Shared/UserCard";

export const DrawerNav = ({
	state,
	navigation
}: DrawerContentComponentProps) => {
	return (
		<Drawer
			header={() => (
				<UserContext.Consumer>
					{(ctx) => <UserCard size="small" user={ctx!.user} logo />}
				</UserContext.Consumer>
			)}
			selectedIndex={new IndexPath(state.index, 0)}
			onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
			style={globalStyles.drawerNavigation}
			footer={DrawerNavFooter}
		>
			{state.routes.map(({ key, name }, i) => (
				<DrawerItem
					key={key}
					title={(props) => (
						<Text style={[props?.style, globalStyles.heading]}>{name}</Text>
					)}
					accessoryLeft={(props) => (
						<SwitchingIcon
							{...props}
							isActive={state.index === i}
							color="#0052CC"
							name={getIconNameValue(name)}
						/>
					)}
				/>
			))}
		</Drawer>
	);
};

const DrawerNavFooter = () => {
	const client = useApolloClient();
	const { setAuthStatus } = useContext(AuthContext)!;

	return (
		<DrawerItem
			title={(props) => (
				<Text style={[props?.style, globalStyles.heading]}>Logout</Text>
			)}
			accessoryLeft={(props) => (
				<SwitchingIcon
					{...props}
					color="#0052CC"
					name={getIconNameValue("Logout")}
				/>
			)}
			onPress={async () => {
				await AsyncStorage.clear();
				await client.clearStore();
				setAuthStatus([false, false]);
			}}
		/>
	);
};
