import { useNavigation } from "@react-navigation/native";
import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { stringGen } from "../../utils/lorem";
import { PageTitle } from "../Shared/PageTitle";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

const updates = [...Array(15)].map(() => ({
	subject: stringGen.generateWords(3),
	brief: stringGen.generateWords(5),
	content: stringGen.generateParagraphs(6),
	postedBy: "Yash Gupta",
	createdAt: "14th May, 12:30 AM",
	byDept: "WEBOPS"
}));

export const UpdateList = () => {
	const { navigate } = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout style={globalStyles.wrapper}>
				<PageTitle text="Updates" />
				<List
					style={{
						width: "100%",
						flex: 1,
						borderWidth: 2,
						borderColor: "#303030"
					}}
					data={updates}
					renderItem={({ item: update }: any) => (
						<ListItem
							title={(props) => (
								<Text
									style={[
										props?.style,
										globalStyles.heading,
										{ color: "#ffab00" }
									]}
								>
									{update.subject}
								</Text>
							)}
							description={(props) => (
								<Text
									style={[
										props?.style,
										globalStyles.text,
										{ color: "#b3b3b3" }
									]}
								>
									{update.brief}
								</Text>
							)}
							style={{ borderBottomWidth: 2, borderBottomColor: "#303030" }}
							onPress={() => navigate("UpdateItem", { update })}
							accessoryRight={(props) => (
								<SwitchingIcon name="right" {...props} color="#B3B3B3" />
							)}
						/>
					)}
				/>
			</Layout>
		</SafeAreaView>
	);
};
