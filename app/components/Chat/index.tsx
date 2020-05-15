import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ChannelList } from "./ChannelList";
import { ChannelView } from "./ChannelView";

const { Navigator, Screen } = createStackNavigator();

export const ChatScreen = () => {
	return (
		<Navigator headerMode="none">
			<Screen name="ChannelList" component={ChannelList} />
			<Screen name="ChannelView" component={ChannelView} />
		</Navigator>
	);
};
