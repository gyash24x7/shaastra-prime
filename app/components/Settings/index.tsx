import { Layout } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { TopNav } from "../Navigation/TopNav";
import { VerticalSpace } from "../Shared/VerticalSpace";
import { AddSubDept } from "./AddSubDept";
import { SelectAvatar } from "./SelectAvatar";
import { SubDeptView } from "./SubDeptView";

export const SettingsScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<TopNav title="Settings" />
			<Layout style={globalStyles.wrapper}>
				<SelectAvatar />
				<VerticalSpace size="tiny" />
				<SubDeptView />
				<VerticalSpace size="tiny" />
				<AddSubDept />
			</Layout>
		</SafeAreaView>
	);
};
