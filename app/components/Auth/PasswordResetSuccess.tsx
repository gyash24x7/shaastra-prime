import { useNavigation } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";
import styles from "./styles";

export const PasswordResetSuccess = () => {
	const navigation = useNavigation();

	return (
		<Layout style={styles.container}>
			<Text category="h3" style={styles.title}>
				PASSWORD RESET SUCCESSFUL!
			</Text>
			<VerticalSpace />
			<Text
				style={[globalStyles.link, { alignSelf: "center" }]}
				onPress={() => navigation.navigate("Login")}
			>
				GO TO LOGIN
			</Text>
		</Layout>
	);
};
