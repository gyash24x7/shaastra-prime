import sendgrid from "@sendgrid/mail";
require("dotenv").config();
sendgrid.setApiKey(process.env.MAIL_KEY!);
export { sendgrid };
