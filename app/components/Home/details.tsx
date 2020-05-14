import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getIconNameValue } from "../../utils";
import globalStyles from "../../utils/globalStyles";
import { stringGen } from "../../utils/lorem";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import { UserCard } from "../Shared/UserCard";
import styles from "./styles";

export const UserDetails = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<Layout style={globalStyles.wrapper}>
				<Layout style={[styles.profileCard]}>
					<UserCard size="large" />
					<Text style={[globalStyles.heading, styles.about]}>
						{stringGen.generateSentences(2)}
					</Text>
					<Layout>
						<List
							data={[
								{ label: "Mobile", value: "7388378834" },
								{ label: "Email", value: "gyash@shaastra.org" },
								{ label: "Roll Number", value: "CH16B025" },
								{ label: "UPI", value: "gyash24x7@okaxis" }
							]}
							renderItem={({ item }: any) => (
								<ListItem
									title={(props) => (
										<Text style={[props?.style, globalStyles.heading]}>
											{item.label}
										</Text>
									)}
									style={{ borderTopWidth: 2, borderTopColor: "#303030" }}
									accessoryRight={() => (
										<Text style={[globalStyles.text]}>{item.value}</Text>
									)}
									accessoryLeft={(props) => (
										<SwitchingIcon
											{...props}
											name={getIconNameValue(item.label)}
										/>
									)}
								/>
							)}
						/>
					</Layout>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
