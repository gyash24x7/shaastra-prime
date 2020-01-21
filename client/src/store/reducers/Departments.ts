import { ChannelAction } from "../../typings";
import { departments as defaultDepartments } from "./../store";

export const DepartmentsReducer = (
	departments = defaultDepartments,
	{ type }: ChannelAction
) => {
	switch ( type ) {
		default:
			return departments;
	}
};
