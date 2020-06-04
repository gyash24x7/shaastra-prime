import React, { Fragment } from "react";
import { VerticalSpace } from "../shared/VerticalSpace";
import { AddSubDept } from "./AddSubDept";
import { AssignFinManager } from "./AssignFinManager";
import { DeleteMember } from "./DeleteMember";
import { GrantAccess } from "./GrantAccess";
import { SelectAvatar } from "./SelectAvatar";
import { SubDeptView } from "./SubDeptView";

export const SettingsScreen = () => {
	return (
		<Fragment>
			<SelectAvatar />
			<VerticalSpace />
			<SubDeptView />
			<VerticalSpace />
			<AddSubDept />
			<VerticalSpace />
			<DeleteMember />
			<VerticalSpace />
			<GrantAccess />
			<VerticalSpace />
			<AssignFinManager />
		</Fragment>
	);
};
