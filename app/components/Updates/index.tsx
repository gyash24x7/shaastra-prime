import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { UpdateItem } from "./UpdateItem";
import { UpdateList } from "./UpdateList";

const { Navigator, Screen } = createStackNavigator();

export const UpdateScreen = () => (
	<Navigator headerMode="none">
		<Screen name="UpdateList" component={UpdateList} />
		<Screen name="UpdateItem" component={UpdateItem} />
	</Navigator>
);
