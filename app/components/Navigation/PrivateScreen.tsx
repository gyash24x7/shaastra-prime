import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { useGetDepartmentsQuery, useMeQuery } from "../../generated";
import { DepartmentContext, UserContext } from "../../utils/context";
import { ChatScreen } from "../Chat";
import { EquipScreen } from "../Equip";
import { FinbooksScreen } from "../Finbooks";
import { HomeScreen } from "../Home";
import { ShowError } from "../Shared/ShowError";
import { UpdateScreen } from "../Updates";
import { DrawerNav } from "./DrawerNav";
import { LoadingScreen } from "./LoadingScreen";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreen = () => {
	const { data, error } = useMeQuery();
	const { data: deptData, error: deptError } = useGetDepartmentsQuery();

	if (error || deptError) {
		console.log(error || deptError);
		return <ShowError />;
	}

	if (data?.me && deptData?.getDepartments) {
		return (
			<UserContext.Provider value={{ user: data.me }}>
				<DepartmentContext.Provider
					value={{ departments: deptData.getDepartments }}
				>
					<Navigator drawerContent={DrawerNav}>
						<Screen name="Home" component={HomeScreen} />
						<Screen name="Equip" component={EquipScreen} />
						<Screen name="Chat" component={ChatScreen} />
						<Screen name="Finbooks" component={FinbooksScreen} />
						<Screen name="Updates" component={UpdateScreen} />
					</Navigator>
				</DepartmentContext.Provider>
			</UserContext.Provider>
		);
	}

	return <LoadingScreen />;
};
