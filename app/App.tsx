import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import React, { Fragment } from "react";
import { AppNavigation } from "./navigation";
import { default as theme } from "./utils/theme.json";

export default function App() {
	const [fontsLoaded] = useFonts({
		"montserrat-regular": require("./assets/fonts/Montserrat-SemiBold.ttf")
	});

	if (fontsLoaded) {
		return (
			<Fragment>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
					<AppNavigation />
				</ApplicationProvider>
			</Fragment>
		);
	} else {
		return <AppLoading />;
	}
}
