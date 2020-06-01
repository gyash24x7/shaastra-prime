import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getIconNameValue } from "../../utils";
import { UserContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";
import { SwitchingIcon } from "../Shared/SwitchingIcon";
import { UserCard } from "../Shared/UserCard";
import styles from "./styles";

export const UserDetails = () => {
	const { user } = useContext(UserContext)!;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<Layout style={globalStyles.wrapper}>
				<Layout style={[styles.profileCard]}>
					<UserCard size="large" user={user} />
					<Text style={[globalStyles.heading, styles.about]}>{user.about}</Text>
					<Layout>
						<List
							data={[
								{ label: "Mobile", value: user.mobile },
								{ label: "Email", value: user.email },
								{ label: "Roll Number", value: user.rollNumber?.toUpperCase() },
								{ label: "UPI", value: user.upi }
							]}
							renderItem={({ item }: any) => (
								<ListItem
									title={(props) => (
										<Text style={[props?.style, globalStyles.heading]}>
											{item.label}
										</Text>
									)}
									style={{ borderTopWidth: 1, borderTopColor: "#303030" }}
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
