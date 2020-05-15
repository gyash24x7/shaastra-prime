import { useNavigation } from "@react-navigation/native";
import {
	Avatar,
	Input,
	Layout,
	List,
	ListItem,
	Text
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { stringGen } from "../../utils/lorem";
import { TopNav } from "../Navigation/TopNav";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

export const ChannelList = () => {
	const { navigate } = useNavigation();

	const renderChannelItem = ({ item }: any) => (
		<ListItem
			title={(props) => (
				<Text style={[props?.style, globalStyles.heading, { color: "#fa0" }]}>
					{item.name}
				</Text>
			)}
			description={(props) => (
				<Text style={[props?.style, globalStyles.text, { color: "#b3b3b3" }]}>
					{item.lastMessage}
				</Text>
			)}
			style={{ borderBottomWidth: 1, borderBottomColor: "#303030" }}
			accessoryRight={(props) => (
				<SwitchingIcon name="right" {...props} color="#B3B3B3" />
			)}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: "https://source.unsplash.com/featured/100x100" }}
					size="small"
					style={{ marginHorizontal: 10, marginVertical: 5 }}
				/>
			)}
			onPress={() => navigate("ChannelView")}
		/>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Channels" />
			<Layout style={globalStyles.wrapper}>
				<Input
					style={styles.searchBar}
					placeholder="Search Channels"
					accessoryRight={(props) => <SwitchingIcon {...props} name="search" />}
				/>
				<List
					style={globalStyles.list}
					data={channels}
					renderItem={renderChannelItem}
				/>
			</Layout>
		</SafeAreaView>
	);
};

const channels = [...Array(10)].map(() => ({
	name: stringGen.generateWords(2),
	lastMessage: stringGen.generateWords(5)
}));

const styles = StyleSheet.create({
	searchBar: {
		borderColor: "#303030",
		backgroundColor: "#141414",
		marginBottom: 5
	}
});
