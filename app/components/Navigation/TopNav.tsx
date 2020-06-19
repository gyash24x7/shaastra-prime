import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Icon,
	Text,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import { PageTitle } from "../Shared/PageTitle";

interface TopNavProps {
	title: string;
	isSmall?: boolean;
}

export const TopNav = ({ title, isSmall }: TopNavProps) => {
	const { dispatch } = useNavigation();

	return (
		<TopNavigation
			style={[globalStyles.topNavigation]}
			title={() => {
				if (isSmall) {
					return (
						<Text style={[globalStyles.heading, { color: "#36b37e" }]}>
							{title}
						</Text>
					);
				} else {
					return <PageTitle text={title} />;
				}
			}}
			alignment="start"
			accessoryLeft={() => (
				<TopNavigationAction
					icon={(props) => <Icon name="menu" {...props} />}
					onPress={() => dispatch(DrawerActions.openDrawer)}
				/>
			)}
		/>
	);
};
