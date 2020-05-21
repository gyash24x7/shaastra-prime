import { ApolloProvider } from "@apollo/client";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./components/Navigation";
import { client } from "./graphql";
import { AntFilledIconsPack, AntOutlinedIconsPack } from "./utils/AntIcons";
import { default as theme } from "./utils/theme.json";

export default function App() {
	const [fontsLoaded] = useFonts({
		"montserrat-regular": require("./assets/fonts/Montserrat-SemiBold.ttf"),
		"montserrat-bold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
		"montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
		antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
		antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf")
	});

	if (fontsLoaded) {
		return (
			<SafeAreaProvider>
				<IconRegistry
					icons={[EvaIconsPack, AntFilledIconsPack, AntOutlinedIconsPack]}
				/>
				<ApolloProvider client={client}>
					<ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
						<AppNavigation />
					</ApplicationProvider>
				</ApolloProvider>
			</SafeAreaProvider>
		);
	} else {
		return <AppLoading />;
	}
}
