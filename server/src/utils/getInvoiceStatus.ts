import { InvoiceStatus, UserRole } from ".";

export const getInvoiceStatus = (
	role: UserRole,
	isFinDept: boolean,
	prev?: boolean
) => {
	if (isFinDept) {
		if (role === UserRole.CORE)
			return prev ? InvoiceStatus.FIN_MANAGER : InvoiceStatus.FIN_CORE;
		else return prev ? InvoiceStatus.CORE : InvoiceStatus.FIN_MANAGER;
	} else {
		switch (role) {
			case UserRole.CORE:
				return prev ? InvoiceStatus.COORD : InvoiceStatus.CORE;
			default:
				return InvoiceStatus.COORD;
		}
	}
};
