import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

interface DrawerItemProps {
	active: boolean;
	text: string;
	icon: string;
	onTouchEnd: () => void;
}

export const CustomDrawerItem = (props: DrawerItemProps) => {
	return (
		<Layout
			style={[
				globalStyles.darkBg,
				globalStyles.drawerItem,
				props.active ? globalStyles.drawerItemActive : {}
			]}
			onTouchEnd={props.onTouchEnd}
		>
			<SwitchingIcon
				isActive={props.active}
				name={props.icon}
				style={[
					globalStyles.drawerItemIcon,
					{ color: props.active ? "#0052cc" : "#ffffff" }
				]}
			/>
			<Text
				style={[
					globalStyles.drawerItemTitle,
					{ color: props.active ? "#0052cc" : "#ffffff" }
				]}
			>
				{props.text}
			</Text>
		</Layout>
	);
};
