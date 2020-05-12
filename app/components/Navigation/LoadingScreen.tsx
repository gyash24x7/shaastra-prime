import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../../utils/globalStyles";

export const LoadingScreen = () => {
	const { navigate } = useNavigation();

	return (
		<Layout style={globalStyles.wrapper}>
			<Spinner />
			<Button onPress={() => navigate("Private")}>Home</Button>
			<Button onPress={() => navigate("Login")}>Login</Button>
		</Layout>
	);
};
