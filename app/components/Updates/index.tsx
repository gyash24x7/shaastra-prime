import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment } from "react";
import { TopNav } from "../Navigation/TopNav";
import { UpdateItem } from "./UpdateItem";
import { UpdateList } from "./UpdateList";

const { Navigator, Screen } = createStackNavigator();

export const UpdateScreen = () => {
	return (
		<Fragment>
			<TopNav />
			<Navigator headerMode="none">
				<Screen name="UpdateList" component={UpdateList} />
				<Screen name="UpdateItem" component={UpdateItem} />
			</Navigator>
		</Fragment>
	);
};
