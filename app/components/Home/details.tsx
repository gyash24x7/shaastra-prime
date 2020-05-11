import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getIconNameValue } from "../../utils";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import styles from "./styles";

export const UserDetails = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<Layout style={globalStyles.wrapper}>
				<Layout style={[styles.profileCard, globalStyles.darkBg]}>
					<Image
						source={{ uri: "https://source.unsplash.com/featured/600x300" }}
						style={{ resizeMode: "cover", height: 200, width: "100%" }}
					/>
					<Layout style={styles.userCard}></Layout>
					<List
						data={[
							{ label: "Mobile", value: "7388378834" },
							{ label: "Email", value: "gyash@shaastra.org" },
							{ label: "Roll Number", value: "CH16B025" },
							{ label: "UPI", value: "gyash24x7@okaxis" }
						]}
						renderItem={({ item }: any) => (
							<ListItem
								title={() => (
									<Text style={[globalStyles.heading]}>{item.label}</Text>
								)}
								style={[globalStyles.darkBg, { marginTop: 2 }]}
								accessoryRight={() => <Text>{item.value}</Text>}
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
		</SafeAreaView>
	);
};
