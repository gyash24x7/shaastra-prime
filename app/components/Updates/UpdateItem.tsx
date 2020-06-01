import { useRoute } from "@react-navigation/native";
import { Card, Layout, Text } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { TopNav } from "../Navigation/TopNav";

export const UpdateItem = () => {
	const { params }: any = useRoute();
	const update = params?.update as any;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor="#141414" />
			<TopNav title="Update" />
			<Layout style={globalStyles.wrapper}>
				<ScrollView style={{ width: "100%" }}>
					<Card
						style={{ width: "100%", borderColor: "#303030", borderWidth: 1 }}
						header={(props) => (
							<Layout {...props}>
								<Text style={[globalStyles.title, { color: "#ffab00" }]}>
									{update.subject}
								</Text>
								<Text style={[globalStyles.heading, { marginBottom: 10 }]}>
									{update.brief}
								</Text>
								<Text
									style={[
										globalStyles.heading,
										{
											fontSize: 12,
											color: "#bae637",
											borderTopColor: "#303030",
											borderTopWidth: 1,
											paddingTop: 10
										}
									]}
								>
									{`By ${update.postedBy.name}  |  ${
										update.byDept.name
									}  |  ${moment(parseInt(update.createdAt)).fromNow()}`}
								</Text>
							</Layout>
						)}
						footer={(props) => (
							<Layout
								{...props}
								style={[
									props?.style,
									{ display: "flex", flexDirection: "row" }
								]}
							></Layout>
						)}
					>
						<Text style={globalStyles.text}>{update.content}</Text>
					</Card>
				</ScrollView>
			</Layout>
		</SafeAreaView>
	);
};
