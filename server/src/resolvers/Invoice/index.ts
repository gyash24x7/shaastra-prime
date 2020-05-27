import { ApproveInvoiceResolver } from "./ApproveInvoice";
import { AttachMediaToInvoiceResolver } from "./AttachMedia";
import { ConnectChannelsToInvoiceResolver } from "./ConnectChannels";
import { DeleteInvoiceResolver } from "./DeleteInvoice";
import { EditInvoiceResolver } from "./EditInvoice";
import { InvoiceFieldResolvers } from "./FieldResolvers";
import { GetInvoicesResolver } from "./GetInvoices";
import { RejectInvoiceResolver } from "./RejectInvoice";
import { SubmitInvoiceResolver } from "./SubmitInvoice";

export default [
	InvoiceFieldResolvers,
	GetInvoicesResolver,
	ApproveInvoiceResolver,
	AttachMediaToInvoiceResolver,
	ConnectChannelsToInvoiceResolver,
	DeleteInvoiceResolver,
	EditInvoiceResolver,
	RejectInvoiceResolver,
	SubmitInvoiceResolver
];
