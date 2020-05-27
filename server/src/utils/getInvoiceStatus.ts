import { InvoiceStatus, UserRole } from "@prisma/client";

export const getInvoiceStatus = (role: UserRole, isFinDept: boolean) => {
	if (isFinDept) {
		if (role === UserRole.CORE) return InvoiceStatus.FIN_CORE;
		else return InvoiceStatus.FIN_MANAGER;
	} else {
		switch (role) {
			case UserRole.COCAD:
				return InvoiceStatus.COCAD;
			case UserRole.HEAD:
				return InvoiceStatus.HEAD;
			case UserRole.CORE:
				return InvoiceStatus.CORE;
			default:
				return InvoiceStatus.COORD;
		}
	}
};
