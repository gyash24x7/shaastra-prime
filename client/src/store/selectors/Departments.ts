import { createSelector } from "reselect";
import { Store } from "../../typings";

const selectDepartments = ( store: Store ) => store.departments;

export const selectDepartmentList = createSelector(
	[ selectDepartments ],
	departments => departments
);
