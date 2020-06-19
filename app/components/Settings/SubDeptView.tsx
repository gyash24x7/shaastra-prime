import { Divider, Layout, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { UserContext } from "../../utils/context";
import globalStyles from "../../utils/globalStyles";

export const SubDeptView = () => {
	const { user } = useContext(UserContext)!;

	return (
		<Layout style={globalStyles.section}>
			<Text style={globalStyles.title}>SubDepartment</Text>
			<Divider style={{ backgroundColor: "#303030", marginVertical: 10 }} />
			<Layout
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row"
				}}
			>
				{user.department?.subDepartments?.map((subDept) => (
					<Layout
						style={{
							width: "33%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: 10,
							borderRightWidth: 1,
							borderLeftWidth: 1,
							borderRightColor: "#303030",
							borderLeftColor: "#303030"
						}}
						key={subDept}
					>
						<Text>{subDept}</Text>
					</Layout>
				))}
			</Layout>
		</Layout>
	);
};
