import { ApproveInvoiceResolver } from "./ApproveInvoice";
import { ConnectChannelsToInvoiceResolver } from "./ConnectChannels";
import { DeleteInvoiceResolver } from "./DeleteInvoice";
import { GetInvoicesResolver } from "./GetInvoices";
import { RejectInvoiceResolver } from "./RejectInvoice";
import { SubmitInvoiceResolver } from "./SubmitInvoice";

export default [
	GetInvoicesResolver,
	ApproveInvoiceResolver,
	ConnectChannelsToInvoiceResolver,
	DeleteInvoiceResolver,
	RejectInvoiceResolver,
	SubmitInvoiceResolver
];
