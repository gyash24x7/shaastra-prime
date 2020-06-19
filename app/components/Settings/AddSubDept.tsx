import {
	Button,
	Divider,
	Input,
	Layout,
	Spinner,
	Text
} from "@ui-kitten/components";
import React, { useState } from "react";
import {
	refetchGetDepartmentsQuery,
	refetchMeQuery,
	useAddSubDeptMutation
} from "../../generated";
import globalStyles from "../../utils/globalStyles";
import { VerticalSpace } from "../Shared/VerticalSpace";

export const AddSubDept = () => {
	const [subDept, setSubDept] = useState("");
	const [addSubDept, { loading, error }] = useAddSubDeptMutation({
		refetchQueries: [refetchMeQuery(), refetchGetDepartmentsQuery()],
		onCompleted: () => setSubDept("")
	});

	return (
		<Layout style={globalStyles.section}>
			<Text style={globalStyles.title}>Add SubDepartments</Text>
			<Divider style={{ backgroundColor: "#303030", marginVertical: 10 }} />
			<Input
				placeholder="Enter SubDepartment"
				size="large"
				value={subDept}
				onChangeText={setSubDept}
			/>
			<VerticalSpace size="tiny" />
			<Layout style={{ display: "flex", flexDirection: "row", margin: -5 }}>
				<Button
					status="primary"
					style={{ flex: 1, marginHorizontal: 5 }}
					children={() =>
						loading ? <Spinner status="control" /> : <Text>ADD SUBDEPT</Text>
					}
					disabled={!subDept}
					onPress={() => addSubDept({ variables: { subDept } })}
				/>
				<Button
					status="danger"
					style={{ flex: 1, marginHorizontal: 5 }}
					children={() => <Text>CANCEL</Text>}
					onPress={() => setSubDept("")}
				/>
			</Layout>
			<VerticalSpace size="tiny" />
			{error && <Text style={globalStyles.errorMsg}>Some Error Occurred!</Text>}
		</Layout>
	);
};
