import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { stringGen } from "../../utils/lorem";
import { TopNav } from "../Navigation/TopNav";

export const UpdateScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav />
			<Layout style={globalStyles.wrapper}>
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
								<Text style={[props?.style, globalStyles.heading]}>
									{update.subject}
								</Text>
							)}
							description={(props) => (
								<Text style={[props?.style, globalStyles.text]}>
									{update.brief}
								</Text>
							)}
							style={{ borderBottomWidth: 2, borderBottomColor: "#303030" }}
						/>
					)}
				/>
			</Layout>
		</SafeAreaView>
	);
};

const updates = [...Array(15)].map(() => ({
	subject: stringGen.generateWords(3),
	brief: stringGen.generateWords(5),
	content: stringGen.generateParagraphs(5),
	postedBy: "Yash Gupta",
	createdAt: "12:30 AM",
	byDept: "WEBOPS"
}));
