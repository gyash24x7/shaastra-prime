import { useNavigation } from "@react-navigation/native";
import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUpdatesQuery } from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { LoadingScreen } from "../Navigation/LoadingScreen";
import { TopNav } from "../Navigation/TopNav";
import { ShowError } from "../Shared/ShowError";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

export const UpdateList = () => {
	const navigation = useNavigation();
	const { data, error, loading } = useGetUpdatesQuery();

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	const renderUpdateItem = ({ item: update }: any) => (
		<ListItem
			title={(props) => (
				<Text style={[props?.style, globalStyles.heading, { color: "#fa0" }]}>
					{update.subject}
				</Text>
			)}
			description={(props) => (
				<Text style={[props?.style, globalStyles.text, { color: "#b3b3b3" }]}>
					{update.brief}
				</Text>
			)}
			style={{ borderBottomWidth: 1, borderBottomColor: "#303030" }}
			onPress={() => navigation.navigate("UpdateItem", { update })}
			accessoryRight={(props) => (
				<SwitchingIcon name="right" {...props} color="#B3B3B3" />
			)}
		/>
	);

	if (loading) return <LoadingScreen />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor="#141414" />
			<TopNav title="Updates" />
			<Layout style={globalStyles.wrapper}>
				<List
					style={globalStyles.list}
					data={data?.getUpdates || []}
					renderItem={renderUpdateItem}
				/>
			</Layout>
		</SafeAreaView>
	);
};
