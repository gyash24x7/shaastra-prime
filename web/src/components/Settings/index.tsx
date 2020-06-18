import React, { Fragment, useContext } from "react";
import { UserRole } from "../../generated";
import { UserContext } from "../../utils/context";
import { VerticalSpace } from "../shared/VerticalSpace";
import { AddSubDept } from "./AddSubDept";
import { AssignFinManager } from "./AssignFinManager";
import { GrantAccess } from "./GrantAccess";
import { SelectAvatar } from "./SelectAvatar";
import { SubDeptView } from "./SubDeptView";

export const SettingsScreen = () => {
	const { user } = useContext(UserContext)!;
	return (
		<Fragment>
			<SelectAvatar />
			<VerticalSpace />
			<SubDeptView />
			<VerticalSpace />
			{user.role === UserRole.Core && <AddSubDept />}
			<VerticalSpace />
			{user.role === UserRole.Core && <GrantAccess />}
			<VerticalSpace />
			{user.role === UserRole.Core && user.department?.name === "FINANCE" && (
				<AssignFinManager />
			)}
		</Fragment>
	);
};
